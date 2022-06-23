import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchQuestion from '../../../SearchQuestion';
import { Dialog } from '../../Provider';
import style from './style.module.css';

interface SearchQuestionDialogInterface {
  close?: Function;
}

export interface SearchInputInterface {
  value: string;
}

const SearchQuestionDialog = (props: SearchQuestionDialogInterface) => {
  const { close } = props;
  const { t } = useTranslation();

  const inlineStyle = {
    maxWidth: '40rem',
    minHeight: '30rem',
    height: '30rem',
    width: '90%',
    overflowY: 'auto',
  };

  const closeDialog = () => {
    close && close();
  };

  return (
    <Dialog close={close} inlineStyle={inlineStyle}>
      <h3 className={style.heading}>{t('dialog.choose_question')}</h3>
      <SearchQuestion closeDialog={closeDialog} />
    </Dialog>
  );
};

export default SearchQuestionDialog;
