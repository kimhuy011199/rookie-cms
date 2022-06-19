import React from 'react';
import style from './style.module.css';
import { ReactComponent as DefaultAvatar } from '../../../assets/images/avatar.svg';

interface AvatarInterface {
  user: any;
  size?: 'sm' | 'lg';
}

const Avatar = (props: AvatarInterface) => {
  const { user, size = 'sm' } = props;

  return (
    <div className={style.img}>
      {user?.avatarImg ? (
        <img
          src={user?.avatarImg}
          alt={user?.displayName}
          className={`${style.avatarImg} ${style[size]}`}
        />
      ) : (
        <DefaultAvatar className={style.avatar} />
      )}
    </div>
  );
};

export default Avatar;
