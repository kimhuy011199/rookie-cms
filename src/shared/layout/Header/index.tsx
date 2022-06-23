import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './style.module.css';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import UserMenu from '../../components/UserMenu';
import { USER_ROLE } from '../../constants/enums';

function Header() {
  const { user } = useSelector((state: any) => state.auth);
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>
            <Link to="/">
              <Logo />
            </Link>
          </h1>
        </div>
        <ul className={styles.list}>
          {user && user?.role === USER_ROLE.ADMIN ? (
            <>
              <li className={styles.item}>
                <span>{user?.email}</span>
              </li>
              <li className={styles.item}>
                <UserMenu />
              </li>
            </>
          ) : (
            <>
              <li className={styles.item}>
                <Link className={styles.link} to="auth/login">
                  <Button label={t('header.login')} variant="primary" />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
