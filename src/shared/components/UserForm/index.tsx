import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';
import TextArea from '../TextArea';
import style from './style.module.css';
import { User } from '../../constants/types/User';
import {
  DISPLAYNAME_PATTERN,
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from '../../constants/patterns';
import EntryMetaData from '../EntryMetaData';
import {
  CONTENT_TYPE,
  INPUT_BUTTON_ACTION,
  USER_ROLE,
} from '../../constants/enums';
import InputButton from '../InputButton';
import Avatar from '../Avatar';

interface UserFormInterface {
  submitFunc: Function;
  currentUser?: User;
}

const UserForm = (props: UserFormInterface) => {
  const { submitFunc, currentUser } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const { isLoading, isError, message } = useSelector(
    (state: any) => state.users
  );

  const handleSubmitForm = (data: any) => {
    submitFunc(data);
  };

  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {currentUser ? (
          <>
            <EntryMetaData
              currentEntry={currentUser}
              type={CONTENT_TYPE.USER}
            />
            <FormGroup
              label={t('users.label.display_name')}
              error={errors.displayName?.message}
              flexRow
            >
              <Input
                type="text"
                defaultValue={currentUser?.displayName}
                disabled
              />
            </FormGroup>
          </>
        ) : (
          <FormGroup
            label={t('users.label.display_name')}
            error={errors.displayName?.message}
            flexRow
          >
            <Input
              type="text"
              {...register('displayName', {
                required: 'Display name is required',
                minLength: {
                  value: 6,
                  message: 'Name must be 6 to 18 character long',
                },
                maxLength: {
                  value: 22,
                  message: 'Name must be 6 to 22 character long',
                },
                pattern: {
                  value: DISPLAYNAME_PATTERN,
                  message: 'Please enter a valid display name',
                },
              })}
            />
          </FormGroup>
        )}
        <FormGroup
          label={t('users.label.email')}
          error={errors.email?.message}
          flexRow
        >
          <Input
            type="text"
            defaultValue={currentUser?.email}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: EMAIL_PATTERN,
                message: 'Please enter a valid email',
              },
            })}
          />
        </FormGroup>
        {!currentUser && (
          <>
            <FormGroup
              label={t('auth.label.password')}
              error={errors.password?.message}
              flexRow
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
            <FormGroup
              label={t('auth.label.password2')}
              error={errors.password2?.message}
              flexRow
            >
              <Input
                type="password"
                {...register('password2', {
                  required: 'Password is required',
                  validate: (val: string) => {
                    if (watch('password') !== val) {
                      return 'Your password does not match';
                    }
                  },
                })}
              />
            </FormGroup>
          </>
        )}
        <FormGroup
          label={t('users.label.github')}
          error={errors.linkGithub?.message}
          flexRow
        >
          <Input
            type="text"
            defaultValue={currentUser?.linkGithub}
            {...register('linkGithub', {})}
          />
        </FormGroup>
        <FormGroup
          label={t('users.label.linkedin')}
          error={errors.linkLinkedIn?.message}
          flexRow
        >
          <Input
            type="text"
            defaultValue={currentUser?.linkLinkedIn}
            {...register('linkLinkedIn', {})}
          />
        </FormGroup>
        <FormGroup
          label={t('users.label.about')}
          error={errors.about?.message}
          flexRow
        >
          <TextArea
            rows={6}
            defaultValue={currentUser?.about || ''}
            {...register('about', {})}
          />
        </FormGroup>
        <FormGroup label={t('users.label.role')} flexRow>
          <Input
            disabled
            type="text"
            defaultValue={currentUser?.role || USER_ROLE.MEMBER}
          />
        </FormGroup>
        {currentUser && (
          <FormGroup label={t('questions.label.user')} flexRow>
            <InputButton
              entry={currentUser}
              actionType={INPUT_BUTTON_ACTION.CHANGE_AVATAR}
              content={
                currentUser ? (
                  <div className={style.avatar}>
                    <Avatar user={currentUser} />
                  </div>
                ) : (
                  t('users.no_avatar')
                )
              }
            />
          </FormGroup>
        )}
        <div className={style.footer}>
          <div>
            {isError && <span className={style.serverError}>{message}</span>}
          </div>
          <div className={style.action}>
            <Button
              label={t('questions.label.submit')}
              loading={isLoading}
              variant="primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
