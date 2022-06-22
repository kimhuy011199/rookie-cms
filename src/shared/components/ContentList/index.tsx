import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CONTENT_TYPE } from '../../constants/enums';
import ContentItem from '../ContentItem';
import Pagination from '../Pagination';
import { ReactComponent as NoEntries } from '../../../assets/images/no-entries.svg';
import style from './style.module.css';

interface ContentListInterface {
  data: {
    list: [];
    totalPages: number;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
  };
  type: string;
  children?: any;
}

const ContentList = (props: ContentListInterface) => {
  const { data, type } = props;
  const { t } = useTranslation();
  const getColHeading = () => {
    switch (type) {
      case CONTENT_TYPE.QUESTION:
        return ['No.', 'Id', 'Title'];
      case CONTENT_TYPE.TAG:
        return ['No.', 'Id', 'Name'];
      case CONTENT_TYPE.ANSWER:
        return ['No.', 'Id', 'Content'];
      case CONTENT_TYPE.USER:
        return ['No.', 'Id', 'Display name'];
      default:
        return ['No.', 'Id', 'Title'];
    }
  };

  return (
    <>
      <div className={style.listContainer}>
        <div className={style.header}>
          {getColHeading().map((heading) => (
            <span key={heading}>{heading}</span>
          ))}
        </div>
        {data.list.length > 0 ? (
          <ul className={style.list}>
            {data.list.map((item: any, index: number) => {
              const noNumber =
                (data.currentPage - 1) * data.itemsPerPage + index + 1;
              return (
                <li
                  key={item?._id ? item?._id + index : index}
                  className={style.item}
                >
                  <ContentItem item={item} type={type} noNumber={noNumber} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={style.emptyContainer}>
            <NoEntries className={style.icon} />
            <span className={style.noEntry}>{t('common.no_entries')}</span>
            <Link className={style.link} to={`/${type}/new`}>
              {t(`${type}.new`)}
            </Link>
          </div>
        )}
      </div>
      {data.totalPages > 1 && (
        <div className={style.pagination}>
          <Pagination {...data} type={type} />
        </div>
      )}
    </>
  );
};

export default ContentList;
