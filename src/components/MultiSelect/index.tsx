import { ChangeEvent, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface MultiSelectProps {
  name: string; // display name
  filterkey: string; // the key of filter
  options: string[]; 
  onSelectionChange: Function;
  val: string[];
}

export default function MultiSelect({name, filterkey, options, onSelectionChange, val}: MultiSelectProps) {
  const [visible, setVisible] = useState(false);

  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      onSelectionChange(filterkey, [...val, e.target.name])
    } else {
      let copy = [...val];
      let idxToDelete = copy.findIndex(x => x === e.target.name);
      copy.splice(idxToDelete,1 );
      onSelectionChange(filterkey, copy);
    }
  }

  const toggleVisibility = function () {
    setVisible(prev => !prev);
  }

  return (
    <Box>
      <div className={styles.name} onClick={toggleVisibility}>
        <Typography
          color="primary"
          variant="button" 
          sx={{'font-size': '1em', cursor: 'pointer'}}>{name}</Typography>
        { visible ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
      </div>
      <FormGroup
        sx={{pl: 1}}
        className={`${styles.list} ${visible ? '' : styles.collapsed}`}>
        {options.map((option, idx) => {
          return (
            <FormControlLabel
              label={
                <Typography variant="body1" sx={{'text-transform': 'capitalize'}}>{option}</Typography>
              }
              control={
                <Checkbox
                  sx={{py: 0.6, 'min-width': '40px'}}
                  size="small"
                  checked={val.includes(option)} 
                  onChange={handleChange} 
                  name={option}/>
              }>
            </FormControlLabel>
          );
        })}
      </FormGroup>
    </Box>
  );
}