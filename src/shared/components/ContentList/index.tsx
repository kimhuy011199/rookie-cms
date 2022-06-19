import React from 'react';
import { CONTENT_TYPE } from '../../constants/enums';
import ContentItem from '../ContentItem';
import Pagination from '../Pagination';
import style from './style.module.css';

interface ContentListInterface {
  data: {
    list: [];
    totalPages: number;
    currentPage: number;
    totalItems: number;
  };
  type: string;
  emptyListContent?: string;
  children?: any;
}

const ContentList = (props: ContentListInterface) => {
  const { data, emptyListContent, type } = props;
  const getColHeading = () => {
    switch (type) {
      case CONTENT_TYPE.QUESTION:
        return ['No.', 'Id', 'Title'];
      case CONTENT_TYPE.TAG:
        return ['No.', 'Id', 'Name'];
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
            {data.list.map((item: any, index: number) => (
              <li
                key={item?._id ? item?._id + index : index}
                className={style.item}
              >
                <ContentItem item={item} type={type} />
              </li>
            ))}
          </ul>
        ) : (
          <h4 className={style.emptyListContent}>{emptyListContent}</h4>
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
