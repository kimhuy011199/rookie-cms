import React from 'react';
import style from './style.module.css';

interface ListInterface {
  data: any;
  heading?: string;
  emptyListContent?: string;
  children?: any;
}

const List = (props: ListInterface) => {
  const { data, heading, emptyListContent, children } = props;

  return (
    <div className={style.listContainer}>
      <h3 className={style.heading}>{heading}</h3>
      {data.length > 0 ? (
        <ul className={style.list}>
          {data.map((item: any, index: number) => (
            <li
              key={item?._id ? item?._id + index : index}
              className={style.item}
            >
              {React.cloneElement(children, { item })}
            </li>
          ))}
        </ul>
      ) : (
        <h4 className={style.emptyListContent}>{emptyListContent}</h4>
      )}
    </div>
  );
};

export default List;
