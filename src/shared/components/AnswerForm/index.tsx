import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDialog } from '../Dialog/Provider';
import PreviewDialog from '../Dialog/dialogs/preview-dialog';
import FormGroup from '../FormGroup';
import Button from '../Button';
import TextArea from '../TextArea';
import style from './style.module.css';
import Input from '../Input';
import EntryMetaData from '../EntryMetaData';
import { CONTENT_TYPE, INPUT_BUTTON_ACTION } from '../../constants/enums';
import InputButton from '../InputButton';

interface AnswerFormInterface {
  submitFunc: Function;
  currentAnswer?: any;
}

const AnswerForm = (props: AnswerFormInterface) => {
  const { submitFunc, currentAnswer } = props;
  const [questionError, setQuestionError] = useState('');
  const [userError, setUserError] = useState('');
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  const { appendDialog } = useDialog();
  const { t } = useTranslation();

  const { isLoading, isError, message, currentQuestion, currentUser } =
    useSelector((state: any) => state.answers);

  const handleSubmitForm = (data: any) => {
    if (!currentQuestion || !currentUser) {
      return;
    }
    submitFunc({
      ...data,
      reqUserId: currentUser._id,
      questionId: currentQuestion._id,
    });
  };

  const previewAnswer = () => {
    const content = getValues('content');
    if (!content) {
      return;
    }
    appendDialog(<PreviewDialog content={content} />);
  };

  useEffect(() => {
    if (isSubmitted) {
      setQuestionError(!currentQuestion ? t('answers.no_question') : '');
      setUserError(!currentUser ? t('answers.no_user') : '');
    }
  }, [currentQuestion, currentUser, isSubmitted, t]);

  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {currentAnswer && (
          <>
            <EntryMetaData
              currentEntry={currentAnswer}
              type={CONTENT_TYPE.ANSWER}
            />
            <FormGroup label={t('answers.label.like_count')} flexRow>
              <Input
                type="text"
                defaultValue={currentAnswer?.likesCount}
                disabled
              />
            </FormGroup>
          </>
        )}
        <FormGroup
          label={t('questions.label.question')}
          flexRow
          error={questionError}
        >
          <InputButton
            entry={currentQuestion || ''}
            actionType={INPUT_BUTTON_ACTION.CHANGE_QUESTION}
            viewType={INPUT_BUTTON_ACTION.VIEW_QUESTION}
            content={currentQuestion?._id || t('answers.no_question')}
          />
        </FormGroup>
        <FormGroup label={t('questions.label.user')} flexRow error={userError}>
          <InputButton
            entry={currentUser || ''}
            actionType={INPUT_BUTTON_ACTION.CHANGE_USER_ANSWER}
            viewType={INPUT_BUTTON_ACTION.VIEW_USER}
            content={currentUser?._id || t('answers.no_user')}
          />
        </FormGroup>
        <FormGroup
          label={t('answers.label.content')}
          flexRow
          error={errors.content?.message}
        >
          <TextArea
            rows={8}
            canResized={false}
            defaultValue={currentAnswer?.content || ''}
            {...register('content', {
              required: 'Content is required',
              minLength: {
                value: 50,
                message: 'Content must be have at least 50 characters',
              },
            })}
          />
        </FormGroup>
        <div className={style.footer}>
          <div>
            {isError && <span className={style.serverError}>{message}</span>}
          </div>
          <div className={style.action}>
            <Button
              label={t('answers.label.preview')}
              type="button"
              variant="outline"
              handleFuncion={previewAnswer}
            />
            <Button
              label={t('answers.label.submit')}
              loading={isLoading}
              variant="primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AnswerForm;
