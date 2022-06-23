import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import style from './style.module.css';
import { userType } from '../../../stores/users/userType';
import { createUser } from '../../../stores/users/userSlice';
import UserForm from '../../../shared/components/UserForm';

const NewUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, isError } = useSelector((state: any) => state.users);

  const submitForm = (data: any) => {
    dispatch(createUser(data));
  };

  useEffect(() => {
    if (isSuccess === userType.CREATE_USER) {
      toast(t('toast.create_user_success'));
      navigate('/users');
    }
  }, [isSuccess, navigate, t]);

  useEffect(() => {
    if (isError === userType.CREATE_USER) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  return (
    <div className={style.container}>
      <h2 className={style.heading}>{t('users.create_new_user')}</h2>
      <UserForm submitFunc={submitForm} />
    </div>
  );
};

export default NewUser;
