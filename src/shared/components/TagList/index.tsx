import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from '../../constants/types/Tag';
import style from './style.module.css';

interface TagListInterface {
  tagList: Tag[];
  isLink?: boolean;
}

const TagList = (props: TagListInterface) => {
  const { tagList, isLink = false } = props;

  return (
    <>
      {tagList.length > 0 && (
        <div className={style.tagList}>
          <ul className={style.list}>
            {tagList.map((tag, index) => (
              <li key={index}>
                {isLink ? (
                  <Link
                    to={`/questions?search=[${tag.name}]`}
                    className={style.link}
                  >
                    {tag.name}
                  </Link>
                ) : (
                  <span className={style.text}>{tag.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TagList;
