import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IoSearchSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { chooseUser as chooseUserAnswer } from '../../../stores/answers/answerSlice';
import { chooseUser as chooseUserQuestion } from '../../../stores/questions/questionSlice';
import { clearSearchUsers, searchUsers } from '../../../stores/users/userSlice';
import { USER_FOR } from '../../constants/enums';
import { User } from '../../constants/types/User';
import Avatar from '../Avatar';
import Input from '../Input';
import UserItem from '../UserItem';
import style from './style.module.css';

export interface SearchInputInterface {
  value: string;
}

export interface SearchUserInterface {
  closeDialog: Function;
  userFor: string;
}

const SearchUser = (props: SearchUserInterface) => {
  const { closeDialog, userFor } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<SearchInputInterface>();

  const { searchUsers: users } = useSelector((state: any) => state.users);

  const handleSearch = (data: SearchInputInterface) => {
    const { value } = data;
    if (!value) {
      return;
    }
    dispatch(searchUsers(value));
  };

  const handleChooseUser = (item: any) => {
    switch (userFor) {
      case USER_FOR.ANSWER:
        dispatch(chooseUserAnswer(item));
        break;
      case USER_FOR.QUESTION:
        dispatch(chooseUserQuestion(item));
        break;
    }
    dispatch(clearSearchUsers());
    closeDialog();
  };

  return (
    <>
      <div className={style.search}>
        <form className={style.form} onSubmit={handleSubmit(handleSearch)}>
          <Input
            type="text"
            placeholder={t('placeholder.user_search_dialog')}
            {...register('value')}
          />
          <button className={style.btn}>
            <IoSearchSharp className={style.icon} />
          </button>
        </form>
      </div>
      {users.length > 0 ? (
        <ul className={style.list}>
          {users.map((item: User) => (
            <UserItem
              key={item._id}
              user={item}
              handleClick={handleChooseUser}
            />
          ))}
        </ul>
      ) : (
        <div className={style.noUsers}>
          <p>{t('users.no_users')}</p>
        </div>
      )}
    </>
  );
};

export default SearchUser;
