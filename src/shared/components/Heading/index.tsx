import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import SearchEntries from '../SearchEntries';
import style from './style.module.css';

interface HeadingProps {
  type: string;
}

const Heading = (props: HeadingProps) => {
  const { type } = props;

  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const searchValue = searchParams.get('search') || '';

  return (
    <div className={style.headingContainer}>
      <div className={style.header}>
        <h2 className={style.heading}>{t(`${type}.heading`)}</h2>
        <div className={style.actions}>
          <SearchEntries type={type} />
          <Link className={style.link} to={`/${type}/new`}>
            {t(`${type}.new`)}
          </Link>
        </div>
      </div>
      {searchValue && (
        <p className={style.search}>
          {t('questions.label.search')}
          <span className={style.for}>{searchValue}</span>
        </p>
      )}
    </div>
  );
};

export default Heading;
