import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getQuestionById,
  updateQuestion,
} from '../../../stores/questions/questionSlice';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import QuestionForm from '../../../shared/components/QuestionForm';
import { useTranslation } from 'react-i18next';
import { ERROR_CODE } from '../../../shared/constants/enums';
import AskQuestionGuide from '../../../shared/components/AskQuestionGuide';
import { questionType } from '../../../stores/questions/questionType';
import { toast } from 'react-toastify';

const EditQuestion = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { question, isLoading, isError, message, isSuccess } = useSelector(
    (state: any) => state.questions
  );
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getQuestionById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isError === questionType.GET_QUESTION_BY_ID) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  useEffect(() => {
    if (isSuccess === questionType.UPDATE_QUESTION) {
      navigate(`/questions/${question._id}`);
    }
  }, [isSuccess, navigate, question]);

  const submitForm = (data: any) => {
    dispatch(updateQuestion({ id: question._id, updatedData: data }));
  };

  if (!user) {
    return <Error code={ERROR_CODE.UNAUTHENTICATED} />;
  }

  if (question?.userId && question.userId !== user._id) {
    return <Error code={ERROR_CODE.FORBIDDEN} />;
  }

  return (
    <>
      <Spinner isLoading={isLoading} />
      <Error
        show={isError && message?.errorCode === 404}
        code={ERROR_CODE.NOT_FOUND}
      />
      {question && (
        <>
          <h2 className={style.heading}>
            {t('questions.update_question_title')}
          </h2>
          <div className={style.container}>
            <div className={style.form}>
              <QuestionForm
                submitFunc={submitForm}
                title={question.title}
                tags={question.tags}
                content={question.content}
              />
            </div>
            <AskQuestionGuide />
          </div>
        </>
      )}
    </>
  );
};

export default EditQuestion;
