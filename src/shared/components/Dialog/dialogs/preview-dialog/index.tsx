import React from 'react';
import { useTranslation } from 'react-i18next';
import { DIALOG_SIZE } from '../../../../constants/enums';
import MarkdownRender from '../../../Markdown';
import { Dialog } from '../../Provider';
import style from './style.module.css';

interface PreviewDialogInterface {
  title?: string;
  content: string;
  close?: Function;
  type?: number;
}

const PreviewDialog = (props: PreviewDialogInterface) => {
  const { content, close } = props;
  const { t } = useTranslation();

  return (
    <Dialog size={DIALOG_SIZE.LG}>
      <Dialog.Header heading={t('dialog.preview')} close={close} />
      <Dialog.Body>
        <div className={style.content}>
          <MarkdownRender content={content} />
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export default PreviewDialog;
