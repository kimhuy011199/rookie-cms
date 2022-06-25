import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersLikeByAnswerId } from '../../../../../stores/answers/answerSlice';
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

  const inlineStyle = {
    maxWidth: '40rem',
    minHeight: '30rem',
    height: '30rem',
    width: '90%',
    overflowY: 'auto',
  };

  const handleNavigate = (user: User) => {
    navigate(`/users/${user._id}`);
  };

  return (
    <Dialog close={close} inlineStyle={inlineStyle}>
      <h3 className={style.heading}>{t('dialog.users_like')}</h3>
      {usersLike.usersList.length > 0 ? (
        <ul className={style.list}>
          {usersLike.usersList.map((item: User) => (
            <UserItem key={item._id} user={item} handleClick={handleNavigate} />
          ))}
        </ul>
      ) : (
        <h3 className={style.noUsersLike}>{t('dialog.no_users_like')}</h3>
      )}
    </Dialog>
  );
};

export default UsersLikeDialog;
