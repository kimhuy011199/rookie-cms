import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import style from './style.module.css';
import { tagType } from '../../../stores/tags/tagType';
import { createTag } from '../../../stores/tags/tagSlice';
import TagForm from '../../../shared/components/TagForm';

const NewTag = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, isError } = useSelector((state: any) => state.tags);

  const submitForm = (data: any) => {
    const { tagName: name } = data;
    dispatch(createTag({ name }));
  };

  useEffect(() => {
    if (isSuccess === tagType.CREATE_TAG) {
      toast(t('toast.create_tag_success'));
      navigate('/tags');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError === tagType.CREATE_TAG) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  return (
    <div className={style.container}>
      <h2 className={style.heading}>{t('tags.create_new_tag')}</h2>
      <TagForm submitFunc={submitForm} />
    </div>
  );
};

export default NewTag;
