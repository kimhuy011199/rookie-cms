import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import { useTranslation } from 'react-i18next';
import { ERROR_CODE } from '../../../shared/constants/enums';
import { toast } from 'react-toastify';
import DeleteEntry from '../../../shared/components/DeleteEntry';
import { useDialog } from '../../../shared/components/Dialog/Provider';
import DeleteEntryDialog from '../../../shared/components/Dialog/dialogs/delete-entry';
import {
  deleteUser,
  getUserById,
  updateUser,
} from '../../../stores/users/userSlice';
import { userType } from '../../../stores/users/userType';
import UserForm from '../../../shared/components/UserForm';

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { appendDialog } = useDialog();

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state: any) => state.users
  );

  const showDeleteDialog = () => {
    const handleDelete = () => {
      if (user?._id) {
        dispatch(deleteUser(user?._id));
      }
    };
    appendDialog(
      <DeleteEntryDialog
        submitDelete={handleDelete}
        title={t('dialog.delete_user')}
        content={t('dialog.delete_user_content')}
      />
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isSuccess === userType.UPDATE_USER) {
      toast(t('toast.update_user_success'));
      navigate('/users');
    }
    if (isSuccess === userType.UPDATE_USER) {
      toast(t('toast.delete_user_success'));
      navigate('/users');
    }
  }, [isSuccess, navigate, user, t]);

  useEffect(() => {
    if (
      isError === userType.GET_USER_BY_ID ||
      isError === userType.UPDATE_USER ||
      isError === userType.DELETE_USER
    ) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  const submitForm = (data: any) => {
    dispatch(updateUser({ id: user._id, updatedData: data }));
  };

  return (
    <>
      <Spinner isLoading={isLoading} />
      <Error
        show={isError && message?.errorCode === 404}
        code={ERROR_CODE.NOT_FOUND}
      />
      {user && user._id === id && (
        <>
          <div className={style.container}>
            <h2 className={style.heading}>{t('users.update_current_user')}</h2>
            <UserForm submitFunc={submitForm} currentUser={user} />
            <DeleteEntry
              showDeleteDialog={showDeleteDialog}
              content={t('users.delete_user')}
            />
          </div>
        </>
      )}
    </>
  );
};

export default EditUser;
