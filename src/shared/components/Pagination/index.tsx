import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { generatePageRange } from '../../../core/utils';
import style from './style.module.css';

const DOTS = '...';

interface PaginationInterface {
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

const Pagination = (props: PaginationInterface) => {
  const { totalPages, currentPage } = props;
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const linkTo = (item: number) =>
    search
      ? `/questions?search=${search}&page=${item}`
      : `/questions?page=${item}`;
  let range: any = generatePageRange(1, totalPages);

  if (totalPages > 6) {
    range = [
      1,
      DOTS,
      ...generatePageRange(currentPage - 1, currentPage + 1),
      DOTS,
      totalPages,
    ];
    if (currentPage < 4) {
      range = [...generatePageRange(1, 4), DOTS, totalPages];
    }
    if (currentPage > totalPages - 3) {
      range = [1, DOTS, ...generatePageRange(totalPages - 3, totalPages)];
    }
  }

  return (
    <div className={style.pagination}>
      <ul className={style.list}>
        {range.map((item: number | string, index: number) => (
          <li key={index}>
            {typeof item === 'number' ? (
              <Link
                className={currentPage === item ? style.active : style.item}
                to={linkTo(item)}
              >
                {item}
              </Link>
            ) : (
              <span>{DOTS}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
