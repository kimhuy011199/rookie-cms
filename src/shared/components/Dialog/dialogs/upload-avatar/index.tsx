import React from 'react';
import { useTranslation } from 'react-i18next';
import { DIALOG_SIZE } from '../../../../constants/enums';
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

  return (
    <Dialog size={DIALOG_SIZE.SM}>
      <Dialog.Header heading={t('dialog.choose_avatar')} close={close} />
      <Dialog.Body>
        <div className={style.container}>
          <UploadAvatar changeEntryAvatar={true} currentEntry={user} />
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export default UploadAvatarDialog;
