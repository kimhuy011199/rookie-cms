import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../shared/components/Button';
import FormGroup from '../../../shared/components/FormGroup';
import Input from '../../../shared/components/Input';
import { PASSWORD_PATTERN } from '../../../shared/constants/patterns';
import { changePassword, reset } from '../../../stores/auth/authSlice';
import style from './style.module.css';
import { toast } from 'react-toastify';
import { authType } from '../../../stores/auth/authType';
import Avatar from '../../../shared/components/Avatar';

export interface PasswordInputInterface {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const { t } = useTranslation();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );
  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordInputInterface>({});

  const dispatch = useDispatch();

  const handleSubmitForm = (data: PasswordInputInterface) => {
    dispatch(changePassword({ ...user, ...data }));
  };

  useEffect(() => {
    if (isSuccess === authType.CHANGE_PASSWORD) {
      toast(t('toast.update_user_success'));
    }
    if (isError === authType.CHANGE_PASSWORD) {
      setError('oldPassword', { type: 'custom', message });
      toast(t('toast.unsuccess'));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isSuccess, isError, t, setError, message]);

  return (
    <div className={style.container}>
      <div className={style.avatar}>
        <Avatar user={user} size="lg" />
      </div>
      <div className={style.profile}>
        <h3 className={style.heading}>{t('settings.heading.change_pass')}</h3>
        <div className={style.form}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <FormGroup
              label={t('settings.label.old_password')}
              error={errors.oldPassword?.message}
              flexRow
            >
              <Input
                type="password"
                {...register('oldPassword', {
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
            <FormGroup
              label={t('settings.label.new_password')}
              error={errors.newPassword?.message}
              flexRow
            >
              <Input
                type="password"
                {...register('newPassword', {
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
            <FormGroup
              label={t('settings.label.confirm_password')}
              error={errors.confirmPassword?.message}
              flexRow
            >
              <Input
                type="password"
                {...register('confirmPassword', {
                  required: 'Password is required',
                  validate: (val: string) => {
                    if (watch('newPassword') !== val) {
                      return 'Your password does not match';
                    }
                  },
                })}
              />
            </FormGroup>
            <div className={style.actions}>
              <Button
                label={t('settings.label.submit')}
                loading={isLoading || isSubmitting}
                variant="primary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
