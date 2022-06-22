import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDialog } from '../Dialog/Provider';
import PreviewDialog from '../Dialog/dialogs/preview-dialog';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';
import TextArea from '../TextArea';
import TagInput from '../TagInput';
import style from './style.module.css';
import { Tag } from '../../constants/types/Tag';
import EntryMetaData from '../EntryMetaData';
import { CONTENT_TYPE } from '../../constants/enums';
import ViewInfoInput from '../ViewInfoInput';

export interface InputInterface {
  title: string;
  content: string;
  tags: string[];
}

interface QuestionFormInterface {
  submitFunc: Function;
  currentQuestion?: any;
}

const QuestionForm = (props: QuestionFormInterface) => {
  const { submitFunc, currentQuestion } = props;
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<InputInterface>();

  const [tags, setTags] = useState<Tag[]>(
    currentQuestion?.tags ? currentQuestion?.tags : []
  );
  const { appendDialog } = useDialog();
  const { t } = useTranslation();

  const { isLoading, isError, message } = useSelector(
    (state: any) => state.questions
  );

  const handleSubmitForm = (data: InputInterface) => {
    const submitData = { ...data, tags };
    submitFunc(submitData);
  };

  const previewQuestion = () => {
    const content = getValues('content');
    if (!content) {
      return;
    }
    appendDialog(<PreviewDialog content={content} />);
  };

  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {currentQuestion && (
          <>
            <EntryMetaData
              currentEntry={currentQuestion}
              type={CONTENT_TYPE.QUESTION}
            />
            <FormGroup label={t('questions.label.user')} flexRow>
              <ViewInfoInput
                previewEntry={currentQuestion.user}
                type={CONTENT_TYPE.QUESTION}
              />
            </FormGroup>
          </>
        )}
        <FormGroup
          label={t('questions.label.title')}
          flexRow
          error={errors.title?.message}
        >
          <Input
            type="text"
            defaultValue={currentQuestion?.title}
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 20,
                message: 'Title must be have at least 20 characters',
              },
            })}
          />
        </FormGroup>
        <FormGroup
          label={t('questions.label.content')}
          flexRow
          error={errors.content?.message}
        >
          <TextArea
            rows={8}
            canResized={false}
            defaultValue={currentQuestion?.content}
            {...register('content', {
              required: 'Content is required',
              minLength: {
                value: 50,
                message: 'Content must be have at least 50 characters',
              },
            })}
          />
        </FormGroup>
        <FormGroup label={t('questions.label.tags')} flexRow>
          <TagInput tags={tags} setTags={setTags} />
        </FormGroup>
        <div className={style.footer}>
          <div>
            {isError && <span className={style.serverError}>{message}</span>}
          </div>
          <div className={style.action}>
            <Button
              label={t('questions.label.preview')}
              type="button"
              variant="outline"
              handleFuncion={previewQuestion}
            />
            <Button
              label={t('questions.label.submit')}
              loading={isLoading}
              variant="primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
