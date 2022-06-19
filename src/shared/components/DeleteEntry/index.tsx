import React from 'react';
import Button from '../Button';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';

interface DeleteEntryInterface {
  showDeleteDialog: () => void;
  content: string;
}

const DeleteEntry = (props: DeleteEntryInterface) => {
  const { showDeleteDialog, content } = props;
  const { t } = useTranslation();

  return (
    <div className={style.deleteContainer}>
      <span>{content}</span>
      <Button
        variant="danger"
        label={t('dialog.delete')}
        handleFuncion={showDeleteDialog}
      />
    </div>
  );
};

export default DeleteEntry;
