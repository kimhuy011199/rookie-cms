import { t } from 'i18next';
import React from 'react';
import Button from '../Button';
import style from './style.module.css';

interface DeleteEntryInterface {
  deleteFunc: () => void;
  content: string;
}

const DeleteEntry = (props: DeleteEntryInterface) => {
  const { deleteFunc, content } = props;

  return (
    <div className={style.deleteContainer}>
      <span>{content}</span>
      <Button
        variant="danger"
        label={t('dialog.delete')}
        handleFuncion={deleteFunc}
      />
    </div>
  );
};

export default DeleteEntry;
