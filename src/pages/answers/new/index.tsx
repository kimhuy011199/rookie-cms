import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import style from './style.module.css';
import {
  clearChooseQuestion,
  clearChooseUser,
  createAnswer,
} from '../../../stores/answers/answerSlice';
import { answerType } from '../../../stores/answers/answerType';
import AnswerForm from '../../../shared/components/AnswerForm';

const NewAnswer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, isError } = useSelector((state: any) => state.answers);

  const submitForm = (data: any) => {
    dispatch(createAnswer(data));
  };

  useEffect(() => {
    dispatch(clearChooseQuestion());
    dispatch(clearChooseUser());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess === answerType.CREATE_ANSWER) {
      toast(t('toast.create_answer_success'));
      navigate('/answers');
    }
  }, [isSuccess, navigate, t]);

  useEffect(() => {
    if (isError === answerType.CREATE_ANSWER) {
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

export default NewAnswer;
