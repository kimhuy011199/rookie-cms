import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { User } from '../../../../constants/types/User';
import Avatar from '../../../Avatar';
import { Dialog } from '../../Provider';
import style from './style.module.css';

interface UserProfileDialogInterface {
  user: User;
  close?: Function;
}

const UserProfileDialog = (props: UserProfileDialogInterface) => {
  const { user, close } = props;
  const { t } = useTranslation();
  const inlineStyle = {
    maxWidth: '20rem',
  };

  return (
    <Dialog close={close} inlineStyle={inlineStyle}>
      <div className={style.container}>
        <div className={style.avatar}>
          <Avatar user={user} size="md" />
        </div>
        <div>
          <p className={style.displayName}>{user.displayName}</p>
          <p className={style.email}>{user.email}</p>
        </div>
        <Link className={style.link} to={`/users/${user._id}`}>
          {t('dialog.user_page')}
        </Link>
      </div>
    </Dialog>
  );
};

export default UserProfileDialog;
