import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Input from '../Input';
import style from './style.module.css';

export interface SearchInputInterface {
  value: string;
}

interface SearchEntriesInterface {
  type: string;
}

const SearchEntries = (props: SearchEntriesInterface) => {
  const { type } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<SearchInputInterface>();

  const handleSearch = (data: SearchInputInterface) => {
    const { value } = data;
    if (!value) {
      return;
    }
    reset();
    navigate(`/${type}?search=${value}`);
  };

  return (
    <div className={style.search}>
      <form className={style.form} onSubmit={handleSubmit(handleSearch)}>
        <Input
          type="text"
          placeholder={t(`placeholder.${type}_search`)}
          {...register('value')}
        />
      </form>
    </div>
  );
};

export default SearchEntries;
