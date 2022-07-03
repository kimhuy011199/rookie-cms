import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DIALOG_SIZE } from '../../../../constants/enums';
import { User } from '../../../../constants/types/User';
import UserItem from '../../../UserItem';
import { Dialog } from '../../Provider';
import style from './style.module.css';

interface UsersLikeDialogInterface {
  close?: any;
}

const UsersLikeDialog = (props: UsersLikeDialogInterface) => {
  const { close } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { usersLike } = useSelector((state: any) => state.answers);

  const handleNavigate = (user: User) => {
    navigate(`/users/${user._id}`);
  };

  return (
    <Dialog size={DIALOG_SIZE.LG}>
      <Dialog.Header heading={t('dialog.users_like')} close={close} />
      <Dialog.Body>
        <div className={style.content}>
          {usersLike.usersList.length > 0 ? (
            <ul className={style.list}>
              {usersLike.usersList.map((item: User) => (
                <UserItem
                  key={item._id}
                  user={item}
                  handleClick={handleNavigate}
                />
              ))}
            </ul>
          ) : (
            <h3 className={style.noUsersLike}>{t('dialog.no_users_like')}</h3>
          )}
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export default UsersLikeDialog;
