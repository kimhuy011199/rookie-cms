import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ERROR_CODE } from '../../constants/enums';
import Button from '../Button';
import style from './style.module.css';

interface ErrorInterface {
  show?: boolean;
  code: number;
}

const Error = (props: ErrorInterface) => {
  const { show = true, code } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onClick = () => {
    if (code === ERROR_CODE.UNAUTHENTICATED) {
      navigate('/auth/login');
    } else {
      navigate('/');
    }
  };

  const errorText = () => {
    switch (code) {
      case ERROR_CODE.NOT_FOUND:
        return 'not_found';
      case ERROR_CODE.FORBIDDEN:
        return 'forbidden';
      case ERROR_CODE.UNAUTHENTICATED:
        return 'unauthenticated';
    }
  };

  const text = errorText();

  if (!show) {
    return null;
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>{t(`${text}.title`)}</h2>
      <span className={style.content}>{t(`${text}.content`)}</span>
      <Button label={t(`${text}.action`)} handleFuncion={onClick} />
    </div>
  );
};

export default Error;
