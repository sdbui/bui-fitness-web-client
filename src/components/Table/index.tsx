import styles from ',/index.module.css';

type ColumnName = string | string[]; // if array => [datumKey, display]

interface TableProps {
  items: any; // todo fix this 
  cols: ColumnName[];
}

export default function ({items = [], cols = []}: TableProps) {
  if (!items.length) return null;
  return (
    <>
      <table>
        <tbody>
        <tr>
          {cols.map((col, idx) => {
            if (Array.isArray(col)) {
              return <th key={idx}>{col[1]}</th>
            }
            return <th key={idx}>{col}</th>
          })}
        </tr>
        {items.map((item: any, rowIdx: any) => {
          return (
            <tr key={rowIdx}>
              {cols.map((colName, colIdx) => {
                if (Array.isArray(colName)) {
                  return (
                    <td key={colIdx}>
                      {item[colName[0]]}
                    </td>
                  )
                } else {
                  return (
                    <td key={colIdx}>
                      {item[colName]}
                    </td>
                  )
                }
              })}
            </tr>
          );
        })}
        </tbody>
      </table>
    </>
      
  );
}