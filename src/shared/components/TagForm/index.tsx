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
import EntryMetaData from '../EntryMetaData';
import { CONTENT_TYPE } from '../../constants/enums';

interface TagFormInterface {
  submitFunc: Function;
  currentTag?: any;
}

const TagForm = (props: TagFormInterface) => {
  const { submitFunc, currentTag } = props;
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
        {currentTag && (
          <EntryMetaData currentEntry={currentTag} type={CONTENT_TYPE.TAG} />
        )}
        <FormGroup
          label={t('tags.label.name')}
          flexRow
          error={errors.tagName?.message}
        >
          <Input
            type="text"
            defaultValue={currentTag?.name || ''}
            {...register('tagName', {
              required: 'Tag name is required',
            })}
          />
        </FormGroup>
        <div className={style.footer}>
          <div>
            {isError && <span className={style.serverError}>{message}</span>}
          </div>
          <div className={style.action}>
            <Button
              label={t('tags.label.submit')}
              loading={isLoading}
              variant="primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TagForm;
