import styles from './index.module.css';

interface PaginationProps {
  links: PaginationLink[];
  clickFn: Function;
}

interface IPagination {
  previous?: string
  first?: string;
  next?: string;
  from?: number;
  to?: number;
  perPage?: number;
  links: PaginationLink[];
}

type PaginationLink = {
  url: string | null;
  label: string | null;
  active: boolean;
}


function Paginator ({links, clickFn}: PaginationProps) {
  if(!links) return null;
  return (
    <ul className={styles.list}>
      {links.map((link, idx) => {
        let cn = styles['list-item'];
        if (!link.url) cn += ` ${styles['disabled']}`;
        if (link.active) cn += ` ${styles['active']}`;
        
        return (
        <li key={idx} dangerouslySetInnerHTML={{ __html: link.label as string }}
          className={cn}
          onClick={() => clickFn(link.url)} 
          />
        )
      })}
    </ul>
  )
}
export default Paginator;
export type {
  IPagination,
  PaginationLink
}