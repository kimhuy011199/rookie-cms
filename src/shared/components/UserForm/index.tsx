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
import { EMAIL_PATTERN } from '../../constants/patterns';

interface UserFormInterface {
  submitFunc: Function;
  currentUser: User;
}

const UserForm = (props: UserFormInterface) => {
  const { submitFunc, currentUser } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const { isLoading, isError, message } = useSelector(
    (state: any) => state.questions
  );

  const handleSubmitForm = (data: any) => {
    submitFunc(data);
  };

  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <FormGroup
          label={t('users.label.display_name')}
          error={errors.displayName?.message}
          flexRow
        >
          <Input disabled type="text" defaultValue={currentUser.displayName} />
        </FormGroup>
        <FormGroup
          label={t('users.label.email')}
          error={errors.email?.message}
          flexRow
        >
          <Input
            type="text"
            defaultValue={currentUser.email}
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
          label={t('users.label.github')}
          error={errors.linkGithub?.message}
          flexRow
        >
          <Input
            type="text"
            defaultValue={currentUser.linkGithub}
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
            defaultValue={currentUser.linkLinkedIn}
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
            defaultValue={currentUser.about || ''}
            {...register('about', {})}
          />
        </FormGroup>
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
