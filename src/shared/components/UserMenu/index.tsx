import React from 'react';
import { useTranslation } from 'react-i18next';
import { USER_ACTIONS } from '../../constants/enums';
import { Menu } from '../Menu';
import { Link, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../../stores/auth/authSlice';
import Avatar from '../Avatar';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state: any) => state.auth);

  const actionMenuOptions = [
    {
      value: USER_ACTIONS.VIEW_PROFILE,
      label: 'menu.view_profile',
      link: '/users/me',
    },
    {
      value: USER_ACTIONS.SETTINGS,
      label: 'menu.settings',
      link: '/users/settings',
    },
    {
      value: USER_ACTIONS.CHANGE_PASS,
      label: 'menu.change_pass',
      link: '/users/change-password',
    },
    { value: USER_ACTIONS.LOG_OUT, label: 'menu.logout', link: '' },
  ];

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <Menu>
      <Menu.Button>
        <div className={style.avatar}>
          <Avatar user={user} />
        </div>
      </Menu.Button>
      <Menu.List>
        {actionMenuOptions.map((action, index) => (
          <Menu.Item key={index}>
            {action.link ? (
              <Link className={style.link} to={action.link}>
                {t(action.label)}
                {action.value === USER_ACTIONS.VIEW_PROFILE && (
                  <span className={style.email}>{user.email}</span>
                )}
              </Link>
            ) : (
              <button className={style.logout} onClick={handleLogOut}>
                {t(action.label)}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.List>
    </Menu>
  );
};

export default UserMenu;
