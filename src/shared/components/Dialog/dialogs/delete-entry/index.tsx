import React from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '../confirm';

interface DeleteEntryDialogInterface {
  type?: number;
  close?: any;
  title: string;
  content: string;
  submitDelete: (event?: any) => void;
}

const DeleteEntryDialog = (props: DeleteEntryDialogInterface) => {
  const { close, content, title, submitDelete } = props;
  const { t } = useTranslation();

  return (
    <ConfirmDialog
      close={close}
      title={title}
      content={content}
      submitBtnText={t('dialog.submit')}
      cancelBtnText={t('dialog.cancel')}
      onClick={submitDelete}
    />
  );
};

export default DeleteEntryDialog;
