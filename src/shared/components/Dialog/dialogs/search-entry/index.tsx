import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEARCH_TYPE } from '../../../../constants/enums';
import SearchQuestion from '../../../SearchQuestion';
import SearchUser from '../../../SearchUser';
import { Dialog } from '../../Provider';
import style from './style.module.css';

interface SearchEntryDialogInterface {
  close?: Function;
  type?: number;
  userFor?: string;
}

export interface SearchInputInterface {
  value: string;
}

const SearchEntryDialog = (props: SearchEntryDialogInterface) => {
  const { close, type, userFor = '' } = props;
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

  const renderContent = () => {
    switch (type) {
      case SEARCH_TYPE.QUESTION:
        return <SearchQuestion closeDialog={closeDialog} />;
      case SEARCH_TYPE.USER:
        return <SearchUser closeDialog={closeDialog} userFor={userFor} />;
    }
  };

  const renderHeading = () => {
    switch (type) {
      case SEARCH_TYPE.QUESTION:
        return <h3 className={style.heading}>{t('dialog.choose_question')}</h3>;
      case SEARCH_TYPE.USER:
        return <h3 className={style.heading}>{t('dialog.choose_user')}</h3>;
    }
  };

  return (
    <Dialog close={close} inlineStyle={inlineStyle}>
      {renderHeading()}
      {renderContent()}
    </Dialog>
  );
};

export default SearchEntryDialog;
