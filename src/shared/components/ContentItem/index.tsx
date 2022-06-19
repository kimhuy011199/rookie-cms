import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.css';

interface ContentItemProps {
  item: any;
  type: string;
}

const ContentItem = (props: ContentItemProps) => {
  const { item, type } = props;
  const linkTo = `/${type}/${item._id}`;

  return (
    <Link to={linkTo} className={style.contentItem}>
      <span></span>
      <span>{item._id}</span>
      <span className={style.title}>{item.title || item.name}</span>
    </Link>
  );
};

export default ContentItem;
