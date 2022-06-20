import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDialog } from '../Dialog/Provider';
import PreviewDialog from '../Dialog/dialogs/preview-dialog';
import FormGroup from '../FormGroup';
import Button from '../Button';
import TextArea from '../TextArea';
import style from './style.module.css';

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

  const { isLoading, isError, message } = useSelector(
    (state: any) => state.answers
  );

  const handleSubmitForm = (data: any) => {
    console.log(data);
    // submitFunc(data);
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
        <FormGroup
          label={t('answers.label.content')}
          flexRow
          error={errors.content?.message}
        >
          <TextArea
            rows={12}
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
