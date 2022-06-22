import React from 'react';
import { useTranslation } from 'react-i18next';
import MarkdownRender from '../../../Markdown';
import TagList from '../../../TagList';
import { Dialog } from '../../Provider';
import style from './style.module.css';

interface PreviewDialogInterface {
  title?: string;
  tags?: [];
  content: string;
  close?: Function;
}

const PreviewDialog = (props: PreviewDialogInterface) => {
  const { title, content, tags = [], close } = props;
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
      <h3 className={style.heading}>{title ? title : t('dialog.preview')}</h3>
      <MarkdownRender content={content} />
      {tags.length > 0 && (
        <div className={style.tagsContainer}>
          <TagList tagList={tags} />
        </div>
      )}
    </Dialog>
  );
};

export default PreviewDialog;
