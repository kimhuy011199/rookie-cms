import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IoSearchSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Input from '../Input';
import style from './style.module.css';

export interface SearchInputInterface {
  value: string;
}

const SearchQuestion = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<SearchInputInterface>();

  const handleSearch = (data: SearchInputInterface) => {
    const { value } = data;
    if (!value) {
      return;
    }
    reset();
    navigate(`/questions?search=${value}`);
  };

  return (
    <div className={style.search}>
      <form className={style.form} onSubmit={handleSubmit(handleSearch)}>
        <Input
          type="text"
          placeholder={t('placeholder.search')}
          {...register('value')}
        />
        <button className={style.btn}>
          <IoSearchSharp className={style.icon} />
        </button>
      </form>
    </div>
  );
};

export default SearchQuestion;
