import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';
import style from './style.module.css';
import { tagType } from '../../../stores/tags/tagType';
import { reset } from '../../../stores/tags/tagSlice';

interface TagFormInterface {
  submitFunc: Function;
  tagName?: string;
}

const TagForm = (props: TagFormInterface) => {
  const { submitFunc, tagName = '' } = props;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const { isLoading, isError, message } = useSelector(
    (state: any) => state.tags
  );

  const handleSubmitForm = (name: any) => {
    submitFunc(name);
  };

  useEffect(() => {
    if (isError === tagType.CREATE_TAG) {
      setError('tagName', { type: 'custom', message });
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, t, setError, message]);

  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormGroup
          label={t('tags.label.name')}
          flexRow
          error={errors.tagName?.message}
        >
          <Input
            type="text"
            defaultValue={tagName}
            {...register('tagName', {
              required: 'Tag name is required',
            })}
          />
        </FormGroup>

        <div className={style.action}>
          <Button
            label={t('tags.label.submit')}
            loading={isLoading}
            variant="primary"
          />
        </div>
      </form>
    </div>
  );
};

export default TagForm;
