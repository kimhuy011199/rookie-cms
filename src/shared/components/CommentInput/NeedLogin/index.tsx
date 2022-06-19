import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import style from './style.module.css';

const NeedLogin = () => {
  const { t } = useTranslation();

  return (
    <div className={style.main}>
      <span className={style.text}>
        {t('questions.login_required.text_1')}
        <Link className={style.link} to="/auth/login">
          {t('questions.login_required.link')}
        </Link>
        {t('questions.login_required.text_2')}
      </span>
    </div>
  );
};

export default NeedLogin;
