import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const inlineStyle = {
    maxWidth: '60rem',
    minHeight: '40rem',
    height: '40rem',
    width: '90%',
    overflowY: 'auto',
  };
  const { t } = useTranslation();

  return (
    <Dialog close={close} inlineStyle={inlineStyle}>
      <h3 className={style.heading}>{t('dialog.preview')}</h3>
      <MarkdownRender content={content} />
    </Dialog>
  );
};

export default PreviewDialog;
