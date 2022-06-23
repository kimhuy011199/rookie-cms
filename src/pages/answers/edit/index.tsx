import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import { useTranslation } from 'react-i18next';
import { COMMENT_TYPE, ERROR_CODE } from '../../../shared/constants/enums';
import { toast } from 'react-toastify';
import DeleteEntry from '../../../shared/components/DeleteEntry';
import { useDialog } from '../../../shared/components/Dialog/Provider';
import DeleteEntryDialog from '../../../shared/components/Dialog/dialogs/delete-entry';
import {
  deleteAnswer,
  getAnswerById,
  reset,
  updateAnswer,
} from '../../../stores/answers/answerSlice';
import { answerType } from '../../../stores/answers/answerType';
import AnswerForm from '../../../shared/components/AnswerForm';

const EditAnswer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { appendDialog } = useDialog();

  const { answer, isLoading, isError, message, isSuccess, currentQuestion } =
    useSelector((state: any) => state.answers);

  const showDeleteDialog = () => {
    const handleDelete = () => {
      if (answer?._id) {
        dispatch(deleteAnswer(answer?._id));
      }
    };
    appendDialog(
      <DeleteEntryDialog
        type={COMMENT_TYPE.COMMENT}
        submitDelete={handleDelete}
        title={t('dialog.delete_answer')}
        content={t('dialog.delete_answer_content')}
      />
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(getAnswerById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isSuccess === answerType.UPDATE_ANSWER) {
      toast(t('toast.update_answer_success'));
      navigate('/answers');
      reset();
    }
    if (isSuccess === answerType.DELETE_ANSWER) {
      toast(t('toast.delete_answer_success'));
      navigate('/answers');
    }
  }, [isSuccess, navigate, answer, t]);

  useEffect(() => {
    if (
      isError === answerType.GET_ANSWER ||
      isError === answerType.UPDATE_ANSWER ||
      isError === answerType.DELETE_ANSWER
    ) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  const submitForm = (data: any) => {
    dispatch(
      updateAnswer({
        id: answer._id,
        updatedData: {
          ...data,
          questionId: currentQuestion._id,
          question: currentQuestion,
        },
      })
    );
  };

  return (
    <>
      <Spinner isLoading={isLoading} />
      <Error
        show={isError && message?.errorCode === 404}
        code={ERROR_CODE.NOT_FOUND}
      />
      {answer && answer._id === id && isSuccess === answerType.GET_ANSWER && (
        <>
          <div className={style.container}>
            <h2 className={style.heading}>
              {t('answers.update_current_answer')}
            </h2>
            <AnswerForm submitFunc={submitForm} currentAnswer={answer} />
            <DeleteEntry
              showDeleteDialog={showDeleteDialog}
              content={t('answers.delete_answer')}
            />
          </div>
        </>
      )}
    </>
  );
};

export default EditAnswer;
