import React from 'react';
import { User } from '../../constants/types/User';
import Avatar from '../Avatar';
import style from './style.module.css';

interface UserItemInterface {
  handleClick?: any;
  user: User;
}

const UserItem = (props: UserItemInterface) => {
  const { user, handleClick } = props;
  return (
    <li className={style.item} onClick={() => handleClick(user)}>
      <div className={style.user}>
        <div className={style.avatar}>
          <Avatar user={user} />
        </div>
        <h3 className={style.title}>{user.displayName}</h3>
        <p className={style.content}>{user.email}</p>
      </div>
    </li>
  );
};

export default UserItem;
