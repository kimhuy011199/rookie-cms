import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { deleteAnswer } from '../../../../../stores/answers/answerSlice';
import ConfirmDialog from '../confirm';
import { COMMENT_TYPE } from '../../../../constants/enums';
import { deleteQuestion } from '../../../../../stores/questions/questionSlice';

interface DeleteCommentDialogInterface {
  data: any;
  type: number;
  close?: any;
}

const DeleteCommentDialog = (props: DeleteCommentDialogInterface) => {
  const { data, close, type } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const submitDelete = () => {
    if (type === COMMENT_TYPE.COMMENT) {
      dispatch(deleteAnswer(data?._id));
    } else {
      dispatch(deleteQuestion(data?._id));
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
