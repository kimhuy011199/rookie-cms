import React from 'react';
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
import { CONTENT_TYPE } from '../../constants/enums';
import ViewInfoInput from '../ViewInfoInput';

interface AnswerFormInterface {
  submitFunc: Function;
  currentAnswer?: any;
}

const AnswerForm = (props: AnswerFormInterface) => {
  const { submitFunc, currentAnswer } = props;
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { appendDialog } = useDialog();
  const { t } = useTranslation();

  const { isLoading, isError, message, currentQuestion } = useSelector(
    (state: any) => state.answers
  );

  const handleSubmitForm = (data: any) => {
    submitFunc(data);
  };

  const previewAnswer = () => {
    const content = getValues('content');
    if (!content) {
      return;
    }
    appendDialog(<PreviewDialog content={content} />);
  };

  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {currentAnswer && (
          <>
            <EntryMetaData
              currentEntry={currentAnswer}
              type={CONTENT_TYPE.ANSWER}
            />
            <FormGroup label={t('answers.label.user')} flexRow>
              <ViewInfoInput
                previewEntry={currentAnswer.user}
                type={CONTENT_TYPE.USER}
              />
            </FormGroup>
            <FormGroup label={t('answers.label.like_count')} flexRow>
              <Input
                type="text"
                defaultValue={currentAnswer?.likesCount}
                disabled
              />
            </FormGroup>
          </>
        )}
        <FormGroup label={t('questions.label.question')} flexRow>
          <ViewInfoInput
            previewEntry={currentQuestion || ''}
            type={CONTENT_TYPE.QUESTION}
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
