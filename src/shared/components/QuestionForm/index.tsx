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

export interface InputInterface {
  title: string;
  content: string;
  tags: string[];
}

interface QuestionFormInterface {
  submitFunc: Function;
  title?: string;
  content?: string;
  tags?: Tag[];
}

const QuestionForm = (props: QuestionFormInterface) => {
  const { submitFunc, title = '', content = '', tags: defaultTag } = props;
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<InputInterface>();

  const [tags, setTags] = useState<Tag[]>(defaultTag ? defaultTag : []);
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
    const [title, content] = getValues(['title', 'content']);
    if (!title || !content) {
      return;
    }
    appendDialog(<PreviewDialog title={title} content={content} />);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormGroup
          label={t('questions.label.title')}
          boldLabel
          subLabel={t('questions.label.sub_title')}
          error={errors.title?.message}
        >
          <Input
            type="text"
            defaultValue={title}
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
          boldLabel
          subLabel={t('questions.label.sub_content')}
          error={errors.content?.message}
        >
          <TextArea
            rows={12}
            canResized={false}
            defaultValue={content}
            {...register('content', {
              required: 'Content is required',
              minLength: {
                value: 50,
                message: 'Content must be have at least 50 characters',
              },
            })}
          />
        </FormGroup>
        <FormGroup
          label={t('questions.label.tags')}
          boldLabel
          subLabel={t('questions.label.sub_tags')}
        >
          <TagInput tags={tags} setTags={setTags} />
        </FormGroup>
        <div className={style.action}>
          <Button
            label={t('questions.label.submit')}
            loading={isLoading}
            variant="primary"
          />
          <Button
            label={t('questions.label.preview')}
            type="button"
            variant="outline"
            handleFuncion={previewQuestion}
          />
        </div>
        {isError && <span className={style.serverError}>{message}</span>}
      </form>
    </>
  );
};

export default QuestionForm;
