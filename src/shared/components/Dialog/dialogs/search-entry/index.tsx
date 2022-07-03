import React from 'react';
import { useTranslation } from 'react-i18next';
import { DIALOG_SIZE, SEARCH_TYPE } from '../../../../constants/enums';
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
        return `${t('dialog.choose_question')}`;
      case SEARCH_TYPE.USER:
        return `${t('dialog.choose_user')}`;
    }
  };

  return (
    <Dialog size={DIALOG_SIZE.LG}>
      <Dialog.Header heading={renderHeading()} close={close} />
      <Dialog.Body>
        <div className={style.content}>
          <div className={style.main}>{renderContent()}</div>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export default SearchEntryDialog;
