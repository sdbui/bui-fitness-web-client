import styles from './index.module.css';

type GridProps = {
  items: any[],
  template?: Function
}

export default function Grid({items, template}: GridProps) {
  return (
    <>
      <div className={styles.grid}>
        {items.map((item, i) => {
          return <div className={styles.gridItem} key={i}>
            {template ? template(item) : JSON.stringify(item)}
          </div>
        })}
      </div>
    </>
  )
}