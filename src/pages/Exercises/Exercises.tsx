import { ChangeEvent, useState, useEffect } from 'react'
import './Exercises.css'
import {
  categoryFilter,
  equipmentFilter,
  exerciseTypeFilter,
  experienceFilter,

} from './filters';
import { useSearchParams } from 'react-router-dom';
import Paginator, {IPagination, PaginationLink} from '../../components/Paginator';

interface SearchParam {
  [key: string]: string;
}

const allFilters = [
  categoryFilter,
  equipmentFilter,
  exerciseTypeFilter,
  experienceFilter,
]

function Exercises() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [exercises, setExercises] = useState([]);
  const [pagination, setPagination] = useState<IPagination>({links: []});

  /**
   * 
   * @param page Optional page number to jump to. Used by pagination
   */
  const getExercises = async (page?: string) => {
    let url = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/exercises`;
    let params = new URLSearchParams(searchParams);

    if (page) params.set('page', page)
    // append filters and maybe page number
    url += `?${params}`;
    let res = await fetch(url);
    let json = await res.json();
    setPagination((prev: IPagination) => {
      let newPag = {...prev};
      newPag.links = json.links;

      // HACK: Modifying the next and previous items in links
      // TODO: see if there is a way to do this on the laravel side of things
      if (newPag.links) {
        newPag.links[0].label = '<<';
        newPag.links[newPag.links.length - 1].label = '>>';
      }

      return newPag;
    })
    setExercises(json.data);
  }

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let filterKey = e.target.name;
    let filterVal = e.target.value;

    // instead of filters... use queryParams
    setSearchParams((oldParams:any)  => {
      let newParams = new URLSearchParams(oldParams);
      if (filterVal) {
        newParams.set(filterKey,filterVal);
      } else {
        newParams.delete(filterKey)
      }
      return newParams;
    });
  }

  /**
   * We won't be navigating anywhere so no need for full url.
   * Instead, just parse out the page parameter and re get exercises
   * 
   */
  const handlePaginatorClick = (url: string | null) => {
    if (!url) return;
    let qs = url.split('?')[1]; // query string
    let params = new URLSearchParams(qs);
    let page = params.get('page');
    getExercises(page as string);
  }

  return (
    <>
      <h1>DEBUG: {JSON.stringify(searchParams)}</h1>
      <div>
        <h3>filters here</h3>
        <button onClick={()=> {setSearchParams({})}}>Clear all filters</button>

        {allFilters.map((filter, idx) => {
          return (
            <div className="filter-section" key={idx}>
              <select name={filter.key} onChange={handleFilterChange} value={searchParams.get(filter.key) || ''}>
                <option value="">-NONE-</option>
                {filter.options.map((opt, optIdx) => {
                  return (
                    <option key={optIdx}>{opt}</option>
                  )
                })}
              </select>
            </div>
          )
        })}
      </div>

      <button onClick={() => getExercises()}>go fetch</button>

      <div>
        <p>Exercises</p>
        <ul>
          {exercises.map((exercise: any, idx) => {
            return <li key={idx}>
              {exercise.name}
            </li>
          })}
        </ul>
      </div>

      <Paginator links={pagination?.links as PaginationLink[]} clickFn={handlePaginatorClick} />

    </>
  )
}

export default Exercises;
