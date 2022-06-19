import React from 'react';
import style from './style.module.css';
import { IoMdClose } from 'react-icons/io';

interface TagInterface {
  value: string;
  onDelete: Function;
  i: number;
}

const Tag = (props: TagInterface) => {
  const { value, onDelete, i } = props;

  return (
    <div className={style.tag}>
      <span>{value}</span>
      <button type="button" onClick={() => onDelete(i)}>
        <IoMdClose />
      </button>
    </div>
  );
};

export default Tag;
