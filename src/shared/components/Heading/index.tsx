import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import SearchEntries from '../SearchEntries';
import style from './style.module.css';

interface HeadingProps {
  type: string;
  entriesFound?: number;
}

const Heading = (props: HeadingProps) => {
  const { type, entriesFound } = props;

  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const searchValue = searchParams.get('search') || '';

  return (
    <div className={style.headingContainer}>
      <div className={style.content}>
        <h2 className={style.heading}>{t(`${type}.heading`)}</h2>
        <div className={style.sub}>
          {searchValue && (
            <p>
              <span>{t(`${type}.label.search`)}</span>
              <span className={style.for}>{searchValue}</span>
            </p>
          )}
          <p>
            {entriesFound} {t('common.entries_found')}
          </p>
        </div>
      </div>
      <div className={style.actions}>
        <SearchEntries type={type} />
        <Link className={style.link} to={`/${type}/new`}>
          {t(`${type}.new`)}
        </Link>
      </div>
    </div>
  );
};

export default Heading;
