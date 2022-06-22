import React from 'react';
import style from './style.module.css';

interface ViewInfoInputInterface {
  id: string;
}

const ViewInfoInput = (props: ViewInfoInputInterface) => {
  const { id } = props;
  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div className={style.input}>
      <span>{id}</span>
      <div className={style.actions}>
        <button type="button" onClick={handleClick}>
          View info
        </button>
      </div>
    </div>
  );
};

export default ViewInfoInput;
