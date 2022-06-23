import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createQuestion } from '../../../stores/questions/questionSlice';
import { questionType } from '../../../stores/questions/questionType';
import { toast } from 'react-toastify';
import QuestionForm from '../../../shared/components/QuestionForm';
import style from './style.module.css';
import { getTags } from '../../../stores/tags/tagSlice';

const NewQuestion = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, isError } = useSelector((state: any) => state.questions);
  const { allTags } = useSelector((state: any) => state.tags);

  const submitForm = (data: any) => {
    dispatch(createQuestion(data));
  };

  useEffect(() => {
    if (isSuccess === questionType.CREATE_QUESTION) {
      toast(t('toast.create_question_success'));
      navigate('/questions');
    }
  }, [isSuccess, navigate, t]);

  useEffect(() => {
    if (isError === questionType.CREATE_QUESTION) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  useEffect(() => {
    dispatch(getTags());
  }, [allTags, dispatch]);

  return (
    <div className={style.container}>
      <h2 className={style.heading}>{t('questions.create_new_question')}</h2>
      <QuestionForm submitFunc={submitForm} />
    </div>
  );
};

export default NewQuestion;
