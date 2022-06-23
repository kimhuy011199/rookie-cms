import React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../../../../constants/types/User';
import UploadAvatar from '../../../UploadAvatar';
import { Dialog } from '../../Provider';
import style from './style.module.css';

interface UploadAvatarDialogInterface {
  user: User;
  close?: Function;
}

const UploadAvatarDialog = (props: UploadAvatarDialogInterface) => {
  const { user, close } = props;
  const { t } = useTranslation();
  const inlineStyle = {
    maxWidth: '18rem',
  };

  return (
    <Dialog close={close} inlineStyle={inlineStyle}>
      <div className={style.container}>
        <h3 className={style.heading}>{t('dialog.choose_avatar')}</h3>
        <UploadAvatar changeEntryAvatar={true} currentEntry={user} />
      </div>
    </Dialog>
  );
};

export default UploadAvatarDialog;
