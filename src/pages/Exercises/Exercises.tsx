import { useState, useEffect } from 'react'
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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import useMousePosition from '../../hooks/useMousePosition';



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
  experienceFilter,
  exerciseTypeFilter,
]

enum ViewMode {
  TABLE = 'table',
  GRID = 'grid'
}


function Exercises() {
  const [searchParams, setSearchParams] = useSearchParams(new URLSearchParams());
  const [exercises, setExercises] = useState([]);
  const [pagination, setPagination] = useState<IPagination>({links: []});
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);
  const navigate = useNavigate();
  useMousePosition();

  // get initial exercises right off the bat
  useEffect(() => {
    getExercises();
  }, []);

  /**
   * 
   * @param page Optional page number to jump to. Used by pagination
   */
  const getExercises = async (page?: number) => {
    let url = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/exercises`;

    let params = new URLSearchParams(searchParams);
    
    if (page) params.set('page', String(page))
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

  const handleFilterChange = (key: string, checkedOptions: string[]) => {
    let filterKey = key;
    let filterVal = checkedOptions;

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
    getExercises(Number(page));
  }

  const clearFilters = () => {
    setSearchParams({});
  }

  return (
    <Stack direction={{sm: 'column', md: 'row'}}>
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        pl={2}
        py={2}
        pr={1.2}
        height={{lg: 'calc(100vh - 50px)'}}
        sx={{'min-width': {sm: '100%', md: '210px'}}} className={styles.sidebar}>
          <Box sx={{'max-height': 'calc(100vh - 125px)', overflow: 'auto'}}>
            {allFilters.map((filter, idx) => {
              return (
                <Filter key={idx} filter={filter} handleFilterChange={(filterKey, vals) => { handleFilterChange(filterKey, vals)}} val={searchParams.get(filter.key)?.split(',') || []}></Filter>
              )
            })}
          </Box>
        <Button color="secondary" sx={{'justify-self': 'center'}} size="small" variant="text" onClick={clearFilters}>Clear</Button>
        <Button size="large" variant="outlined" onClick={() => getExercises()}>Filter Items</Button>
      </Box>
      <Box className={styles.content}
        display="flex"
        flexDirection="column"
        height={{lg: 'calc(100vh - 50px)'}}
      >
        {
          viewMode === ViewMode.GRID ? 
            <Grid items={exercises} template={GridItemTemplate}/> :
            <Table items={exercises} cols={['name', ['category', 'target muscle'],'secondary_muscles', ['exercise_type', 'type'], ['equipment_required', 'equipment'], ['experience_level', 'experience'], 'url']}/>
        }
        <Paginator 
          links={pagination?.links as PaginationLink[]} clickFn={handlePaginatorClick} />
      </Box>
    </Stack>
  )
}

function openExercise (url: string){

  window.open(url)

}

function GridItemTemplate (item: any) {

  const difficultyColorMap = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error'
  };

  return (
    <div className={styles.gridItem} onClick={() => {openExercise(item.url)}}>
      <div className={styles.cardImage}>
        <img src={item.thumbnail || '/barbell.svg'}/>
      </div>
      <Box sx={{padding: '0 15px'}}>
        <Box>
          <Typography variant='h6' align='center' sx={{'text-transform': 'capitalize', 'white-space': 'nowrap', overflow: 'hidden', 'text-overflow': 'ellipsis'}}>{item.name}</Typography>
        </Box>
        <div className={styles.primaryMuscles}>
          <Typography variant="caption">Target Muscles</Typography>
          <Box display="flex" gap={1} sx={{'scrollbarWidth': 'none', width:'100%', overflow: 'scroll'}}>
            <Chip label={item['category']} size="small" color="info" sx={{'text-transform': 'capitalize'}}/>
            {item['secondary_muscles'].length === 0 ? '': (
              item['secondary_muscles'].map(({name}: {name: string}) => {
                return <Chip label={name} size="small" color="primary" sx={{'text-transform': 'capitalize'}}/>
              })
            )}
          </Box>
          {/* <Typography variant="subtitle1">{item['category']}</Typography> */}
        </div>
        <div className={styles.equipment}>
          <Typography variant="caption">Equipment</Typography>
          <Box>
            <Chip size="small" label={item['equipment_required']}  sx={{'text-transform': 'capitalize'}}/>
          </Box>
        </div>
        <div className={styles.difficulty}>
          <Typography variant="caption">Difficulty</Typography>
          <Box>
            <Chip size="small" label={item['experience_level']} color={difficultyColorMap[item['experience_level']]} sx={{'text-transform': 'capitalize'}}/>
          </Box>
        </div>
      </Box>
    </div>
  );
}

function Filter ({filter, handleFilterChange, val}: {filter: IFilter, handleFilterChange: Function, val: string[]}) {
  const [visible, setVisible] = useState(false);

  return (
    <MultiSelect name={filter.display} filterkey={filter.key}
      options={filter.options}
      onSelectionChange={handleFilterChange}
      val={val}
    />
  );
}

export default Exercises;
