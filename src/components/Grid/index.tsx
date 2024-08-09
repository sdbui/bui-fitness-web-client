import styles from './index.module.css';
import Box from '@mui/material/Box';

type GridProps = {
  items: any[],
  template?: Function
}

export default function Grid({items, template}: GridProps) {
  return (
    <Box className={styles.grid}
      sx={{'max-height': 'calc(100vh - 120px)', overflow: 'auto'}}
    >
      {items.map((item, i) => {
        return <div className={styles.gridItem} key={i}>
          {template ? template(item) : JSON.stringify(item)}
        </div>
      })}
    </Box>
  )
}