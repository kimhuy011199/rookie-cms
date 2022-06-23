import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import style from './style.module.css';
import { userType } from '../../../stores/users/userType';
import AnswerForm from '../../../shared/components/AnswerForm';
import { createUser } from '../../../stores/users/userSlice';
import { clearChooseQuestion } from '../../../stores/answers/answerSlice';

const NewUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, isError } = useSelector((state: any) => state.users);

  const submitForm = (data: any) => {
    console.log({ data });
    // dispatch(createUser(data));
  };

  useEffect(() => {
    dispatch(clearChooseQuestion());
  }, []);

  useEffect(() => {
    if (isSuccess === userType.CREATE_USER) {
      toast(t('toast.create_answer_success'));
      navigate('/answers');
    }
  }, [isSuccess, navigate, t]);

  useEffect(() => {
    if (isError === userType.CREATE_USER) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  return (
    <div className={style.container}>
      <h2 className={style.heading}>{t('answers.create_new_answer')}</h2>
      <AnswerForm submitFunc={submitForm} />
    </div>
  );
};

export default NewUser;
