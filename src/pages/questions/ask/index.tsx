import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createQuestion } from '../../../stores/questions/questionSlice';
import QuestionForm from '../../../shared/components/QuestionForm';
import style from './style.module.css';
import { ERROR_CODE } from '../../../shared/constants/enums';
import Error from '../../../shared/components/Error';
import AskQuestionGuide from '../../../shared/components/AskQuestionGuide';
import { questionType } from '../../../stores/questions/questionType';
import { toast } from 'react-toastify';

const AskQuestion = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { question, isSuccess, isError } = useSelector(
    (state: any) => state.questions
  );
  const { user } = useSelector((state: any) => state.auth);

  const submitForm = (data: any) => {
    dispatch(createQuestion(data));
  };

  useEffect(() => {
    if (isSuccess === questionType.CREATE_QUESTION) {
      navigate(`/questions/${question._id}`);
    }
  }, [isSuccess, navigate, question]);

  useEffect(() => {
    if (isError === questionType.CREATE_QUESTION) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  if (!user) {
    return <Error code={ERROR_CODE.UNAUTHENTICATED} />;
  }

  return (
    <>
      <h2 className={style.heading}>{t('questions.ask_question_title')}</h2>
      <div className={style.container}>
        <div className={style.form}>
          <QuestionForm submitFunc={submitForm} />
        </div>
        <AskQuestionGuide />
      </div>
    </>
  );
};

export default AskQuestion;
