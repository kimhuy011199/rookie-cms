import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { login, reset } from '../../../stores/auth/authSlice';
import FormGroup from '../../../shared/components/FormGroup';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from '../../../shared/constants/patterns';
import { ReactComponent as Logo } from '../../../assets/images/favicon.svg';
import style from '../style.module.css';
import { authType } from '../../../stores/auth/authType';

export interface LoginUserInterface {
  email: string;
  password: string;
}

function Login() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInterface>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isSuccess === authType.LOGIN || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const handleSubmitForm = (data: LoginUserInterface) => {
    dispatch(login(data));
  };

  return (
    <>
      <div className={style.logo}>
        <Logo />
      </div>
      <h2 className={style.heading}>{t('auth.login.desc')}</h2>
      <p className={style.sub}>{t('auth.login.sub')}</p>
      <div className={style.form}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <FormGroup
            label={t('auth.label.email')}
            error={errors.email?.message}
          >
            <Input
              type="text"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: EMAIL_PATTERN,
                  message: 'Please enter a valid email',
                },
              })}
            />
          </FormGroup>
          <FormGroup
            label={t('auth.label.password')}
            error={errors.password?.message}
          >
            <Input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be 6 to 18 character long',
                },
                maxLength: {
                  value: 18,
                  message: 'Password must be 6 to 18 character long',
                },
                pattern: {
                  value: PASSWORD_PATTERN,
                  message: 'Password includes characters and numbers',
                },
              })}
            />
          </FormGroup>
          <Button
            label={t('auth.label.submit')}
            loading={isLoading}
            variant="primary"
            full
          />
          {isError === authType.LOGIN && (
            <span className={style.serverError}>{message}</span>
          )}
        </form>
      </div>
    </>
  );
}

export default Login;
