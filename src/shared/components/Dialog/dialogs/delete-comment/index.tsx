import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { answerType } from '../../../../../stores/answers/answerType';
import { deleteAnswer } from '../../../../../stores/answers/answerSlice';
import ConfirmDialog from '../confirm';
import { COMMENT_TYPE } from '../../../../constants/enums';
import { deleteQuestion } from '../../../../../stores/questions/questionSlice';
import { questionType } from '../../../../../stores/questions/questionType';
import { useNavigate } from 'react-router-dom';

interface DeleteCommentDialogInterface {
  data: any;
  type: number;
  close?: any;
}

const DeleteCommentDialog = (props: DeleteCommentDialogInterface) => {
  const { data, close, type } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAnswerSuccess, isAnswerError } = useSelector(
    (state: any) => state.answers
  );
  const { isQuestionError } = useSelector((state: any) => state.questions);

  const submitDelete = () => {
    if (type === COMMENT_TYPE.COMMENT) {
      dispatch(deleteAnswer(data?._id));
    } else {
      dispatch(deleteQuestion(data?._id));
      navigate('./users/me');
    }
  };

  const title = t(
    `dialog.delete_${type === COMMENT_TYPE.COMMENT ? 'answer' : 'question'}`
  );
  const content = t(
    `dialog.delete_${
      type === COMMENT_TYPE.COMMENT ? 'answer' : 'question'
    }_content`
  );

  useEffect(() => {
    if (isAnswerSuccess === answerType.DELETE_ANSWER) {
      toast(t('toast.delete_answer_success'));
    }
    if (isAnswerError === answerType.DELETE_ANSWER) {
      toast(t('toast.unsuccess'));
    }
    if (isQuestionError === questionType.DELETE_QUESTION) {
      toast(t('toast.unsuccess'));
    }
  }, [isAnswerError, isQuestionError, isAnswerSuccess, t]);

  return (
    <ConfirmDialog
      close={close}
      title={title}
      content={content}
      submitBtnText={t('dialog.submit')}
      cancelBtnText={t('dialog.cancel')}
      onClick={submitDelete}
    />
  );
};

export default DeleteCommentDialog;
