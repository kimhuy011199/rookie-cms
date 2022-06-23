import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IoSearchSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { chooseQuestion } from '../../../stores/answers/answerSlice';
import {
  clearSearchQuestions,
  searchQuestions,
} from '../../../stores/questions/questionSlice';
import { Question } from '../../constants/types/Question';
import Input from '../Input';
import style from './style.module.css';

export interface SearchInputInterface {
  value: string;
}

export interface SearchEntriesInterface {
  closeDialog: Function;
}

const SearchEntries = (props: SearchEntriesInterface) => {
  const { closeDialog } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<SearchInputInterface>();

  const { searchQuestions: questions, isLoading } = useSelector(
    (state: any) => state.questions
  );

  const handleSearch = (data: SearchInputInterface) => {
    const { value } = data;
    if (!value) {
      return;
    }
    dispatch(searchQuestions(value));
  };

  const handleChooseQuestion = (item: Question) => {
    dispatch(chooseQuestion(item));
    dispatch(clearSearchQuestions());
    closeDialog();
  };

  console.log({ questions });
  return (
    <>
      <div className={style.search}>
        <form className={style.form} onSubmit={handleSubmit(handleSearch)}>
          <Input
            type="text"
            placeholder={t('placeholder.question_search_dialog')}
            {...register('value')}
          />
          <button className={style.btn}>
            <IoSearchSharp className={style.icon} />
          </button>
        </form>
      </div>
      {questions.length > 0 ? (
        <ul className={style.list}>
          {questions.map((item: Question) => (
            <li
              className={style.item}
              key={item._id}
              onClick={() => handleChooseQuestion(item)}
            >
              <h3 className={style.title}>{item.title}</h3>
              <p className={style.content}>{item.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className={style.noQuestions}>
          <p>{t('questions.no_questions')}</p>
        </div>
      )}
    </>
  );
};

export default SearchEntries;
