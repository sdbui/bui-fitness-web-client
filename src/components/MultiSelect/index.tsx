import { ChangeEvent, useState, useEffect } from 'react';

interface MultiSelectProps {
  name: string;
  filterkey: string;
  options: string[];
  onSelectionChange: Function;
}

export default function MultiSelect({name, filterkey, options, onSelectionChange}: MultiSelectProps) {
  const [selection, setSelection] = useState(new Set());

  // effect will fire callback with selection array every time set changes
  useEffect(() => {
    onSelectionChange(filterkey, Array.from(selection));
  }, [selection]);

  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    setSelection(prev => {
      let newSelection = new Set(prev);
      if (e.target.checked) {
        newSelection.add(e.target.name);
      } else {
        newSelection.delete(e.target.name);
      }
      return newSelection;
    })
  }

  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {options.map((option, idx) => {
          return (
            <li key={idx}>
              <input type="checkbox" name={option} key={idx} onChange={handleChange}></input>
              <label htmlFor={option}>{option}</label>
            </li>
          )
        })}
      </ul>
    </div>
  );
}