import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IoSearchSharp } from 'react-icons/io5';
import { Question } from '../../../../constants/types/Question';
import Input from '../../../Input';
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
