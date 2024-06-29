import { ChangeEvent, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';

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
    <div>
      <div className={styles.name} onClick={toggleVisibility}>
        <h3>{name}</h3>
        { visible ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
      </div>
      <ul className={`${styles.list} ${visible ? '' : styles.collapsed}`}>
        {options.map((option, idx) => {
          return (
            <li key={idx}>
              <input type="checkbox" 
                id={`${filterkey}-${idx}`} 
                name={option} 
                key={idx} 
                onChange={handleChange}
                checked={val.includes(option)}></input>
              <label htmlFor={`${filterkey}-${idx}`}>{option}</label>
            </li>
          )
        })}
      </ul>
    </div>
  );
}