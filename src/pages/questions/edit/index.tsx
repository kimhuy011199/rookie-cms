import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  deleteQuestion,
  getQuestionById,
  updateQuestion,
} from '../../../stores/questions/questionSlice';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import QuestionForm from '../../../shared/components/QuestionForm';
import { useTranslation } from 'react-i18next';
import { COMMENT_TYPE, ERROR_CODE } from '../../../shared/constants/enums';
import { questionType } from '../../../stores/questions/questionType';
import { toast } from 'react-toastify';
import DeleteEntry from '../../../shared/components/DeleteEntry';
import { useDialog } from '../../../shared/components/Dialog/Provider';
import DeleteEntryDialog from '../../../shared/components/Dialog/dialogs/delete-entry';

const EditQuestion = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { appendDialog } = useDialog();

  const { question, isLoading, isError, message, isSuccess } = useSelector(
    (state: any) => state.questions
  );

  const showDeleteDialog = () => {
    const handleDelete = () => {
      if (question?._id) {
        dispatch(deleteQuestion(question?._id));
      }
    };
    appendDialog(
      <DeleteEntryDialog
        type={COMMENT_TYPE.QUESTION}
        submitDelete={handleDelete}
        title={t('dialog.delete_question')}
        content={t('dialog.delete_question_content')}
      />
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(getQuestionById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isSuccess === questionType.UPDATE_QUESTION) {
      toast(t('toast.update_question_success'));
      navigate('/questions');
    }
    if (isSuccess === questionType.DELETE_QUESTION) {
      toast(t('toast.delete_question_success'));
      navigate('/questions');
    }
  }, [isSuccess, navigate, question, t]);

  useEffect(() => {
    if (
      isError === questionType.GET_QUESTION_BY_ID ||
      isError === questionType.UPDATE_QUESTION ||
      isError === questionType.DELETE_QUESTION
    ) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  const submitForm = (data: any) => {
    dispatch(updateQuestion({ id: question._id, updatedData: data }));
  };

  return (
    <>
      <Spinner isLoading={isLoading} />
      <Error
        show={isError && message?.errorCode === 404}
        code={ERROR_CODE.NOT_FOUND}
      />
      {question && (
        <>
          <div className={style.container}>
            <h2 className={style.heading}>
              {t('questions.update_current_question')}
            </h2>
            <QuestionForm
              submitFunc={submitForm}
              title={question.title}
              tags={question.tags}
              content={question.content}
            />
            <DeleteEntry
              showDeleteDialog={showDeleteDialog}
              content={t('questions.delete_question')}
            />
          </div>
        </>
      )}
    </>
  );
};

export default EditQuestion;
