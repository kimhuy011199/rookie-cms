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
        <FormGroup label={t('answers.label.answer_id')} flexRow>
          <Input type="text" defaultValue={currentAnswer?._id} disabled />
        </FormGroup>
        <FormGroup label={t('answers.label.question_id')} flexRow>
          <Input
            type="text"
            defaultValue={currentAnswer?.questionId}
            disabled
          />
        </FormGroup>
        <FormGroup label={t('answers.label.user_id')} flexRow>
          <Input type="text" defaultValue={currentAnswer?.userId} disabled />
        </FormGroup>
        <FormGroup label={t('answers.label.created_at')} flexRow>
          <Input type="text" defaultValue={currentAnswer?.createdAt} disabled />
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
        <FormGroup label={t('answers.label.like_count')} flexRow>
          <Input
            type="text"
            defaultValue={currentAnswer?.likesCount}
            disabled
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