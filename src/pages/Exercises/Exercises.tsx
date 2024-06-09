import { ChangeEvent, useState, useEffect } from 'react'
import styles from './Exercises.module.css';
import {
  categoryFilter,
  equipmentFilter,
  exerciseTypeFilter,
  experienceFilter,

} from './filters';
import { useSearchParams } from 'react-router-dom';
import Paginator, {IPagination, PaginationLink} from '../../components/Paginator';
import Table from '../../components/Table';
import Grid from '../../components/Grid';
import MultiSelect from '../../components/MultiSelect';

interface SearchParam {
  [key: string]: string;
}

interface IFilter {
  display: string;
  key: string;
  options: string[];
}

const allFilters = [
  categoryFilter,
  equipmentFilter,
  exerciseTypeFilter,
  experienceFilter,
]

enum ViewMode {
  TABLE = 'table',
  GRID = 'grid'
}


function Exercises() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [exercises, setExercises] = useState([]);
  const [pagination, setPagination] = useState<IPagination>({links: []});
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.TABLE);


  // get initial exercises right off the bat
  useEffect(() => {
    getExercises();
  }, []);

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

  const handleFilterChange = (key: string,checkedOptions: string[]) => {
    debugger;
    let filterKey = key;
    let filterVal = checkedOptions;

    // instead of filters... use queryParams
    setSearchParams((oldParams:any)  => {
      let newParams = new URLSearchParams(oldParams);
      if (filterVal.length) {
        newParams.set(filterKey,filterVal.join(','));
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
            <Filter filter={filter} key={idx} handleFilterChange={handleFilterChange}/>
          )
        })}
      </div>

      <button onClick={() => getExercises()}>go fetch</button>

      <div>
        <p>Exercises</p>
        <button onClick={() => setViewMode(ViewMode.GRID)}>GRID VIEW</button>
        <button onClick={() => setViewMode(ViewMode.TABLE)}>TABLE VIEW</button>
        {
          viewMode === ViewMode.GRID ? 
            <Grid items={exercises} template={GridItemTemplate}/> :
            <Table items={exercises} cols={['name', ['target_muscle_group', 'target muscle'], ['exercise_type', 'type'], ['equipment_required', 'equipment'], ['experience_level', 'experience'], 'url']}/>
        }
      </div>

      <Paginator links={pagination?.links as PaginationLink[]} clickFn={handlePaginatorClick} />

    </>
  )
}

function openExercise (e: any){

}

function GridItemTemplate (item: any) {
  return (
    <div className={styles.gridItem} onClick={openExercise}>
      <h3>{item.name}</h3>
      <div>{item['target_muscle_group']}</div>
      <div>{item['exercise_type']}</div>
      <div>{item['equipment_required']}</div>
      <div>{item['experience_level']}</div>
      <a href={item.url} target='_blank' className={styles.exerciseAnchor}>PLAY</a>
    </div>
  );
}

function Filter ({filter, handleFilterChange}: {filter: IFilter, handleFilterChange: Function}) {
  return (
    <MultiSelect name={filter.display} filterkey={filter.key}
      options={filter.options}
      onSelectionChange={handleFilterChange}
    />
  );
}

export default Exercises;
