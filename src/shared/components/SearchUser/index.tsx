import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IoSearchSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { chooseUser } from '../../../stores/answers/answerSlice';
import { clearSearchUsers, searchUsers } from '../../../stores/users/userSlice';
import { User } from '../../constants/types/User';
import Input from '../Input';
import style from './style.module.css';

export interface SearchInputInterface {
  value: string;
}

export interface SearchUserInterface {
  closeDialog: Function;
}

const SearchUser = (props: SearchUserInterface) => {
  const { closeDialog } = props;
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

  const handleChooseUser = (item: User) => {
    dispatch(chooseUser(item));
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
            <li
              className={style.item}
              key={item._id}
              onClick={() => handleChooseUser(item)}
            >
              <h3 className={style.title}>{item.displayName}</h3>
              <p className={style.content}>{item.email}</p>
            </li>
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
