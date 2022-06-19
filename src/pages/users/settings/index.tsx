import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../shared/components/Button';
import FormGroup from '../../../shared/components/FormGroup';
import Input from '../../../shared/components/Input';
import TextArea from '../../../shared/components/TextArea';
import UploadAvatar from '../../../shared/components/UploadAvatar';
import { EMAIL_PATTERN } from '../../../shared/constants/patterns';
import { reset, updateUser } from '../../../stores/auth/authSlice';
import style from './style.module.css';
import { toast } from 'react-toastify';
import { authType } from '../../../stores/auth/authType';

export interface UserInputInterface {
  displayName: string;
  email: string;
  about?: string;
  linkGithub?: string;
  linkLinkedIn?: string;
}

const UserSetting = () => {
  const { t } = useTranslation();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserInputInterface>({});

  const dispatch = useDispatch();

  const handleSubmitForm = (data: UserInputInterface) => {
    dispatch(updateUser({ ...user, ...data }));
  };

  useEffect(() => {
    if (isSuccess === authType.UPDATE_USER) {
      toast(t('toast.update_user_success'));
    }
    if (isError === authType.UPDATE_USER) {
      setError('email', { type: 'custom', message });
      toast(t('toast.unsuccess'));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isSuccess, isError, t, setError, message]);

  return (
    <div className={style.container}>
      <UploadAvatar />
      <div className={style.user}>
        <div className={style.profile}>
          <h3 className={style.heading}>{t('settings.heading.settings')}</h3>
          <div className={style.form}>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <FormGroup
                label={t('settings.label.display_name')}
                error={errors.displayName?.message}
                flexRow
              >
                <Input
                  disabled
                  type="text"
                  defaultValue={user.displayName}
                  {...register('displayName', {})}
                />
              </FormGroup>
              <FormGroup
                label={t('settings.label.email')}
                error={errors.email?.message}
                flexRow
              >
                <Input
                  type="text"
                  defaultValue={user.email}
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
                label={t('settings.label.github')}
                error={errors.linkGithub?.message}
                flexRow
              >
                <Input
                  type="text"
                  defaultValue={user.linkGithub}
                  {...register('linkGithub', {})}
                />
              </FormGroup>
              <FormGroup
                label={t('settings.label.linkedin')}
                error={errors.linkLinkedIn?.message}
                flexRow
              >
                <Input
                  type="text"
                  defaultValue={user.linkLinkedIn}
                  {...register('linkLinkedIn', {})}
                />
              </FormGroup>
              <FormGroup
                label={t('settings.label.about')}
                error={errors.about?.message}
                flexRow
              >
                <TextArea
                  rows={6}
                  defaultValue={user.about || ''}
                  {...register('about', {})}
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
    </div>
  );
};

export default UserSetting;
