import React from 'react';
import Button from '../Button';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useDialog } from '../Dialog/Provider';
import ConfirmDialog from '../Dialog/dialogs/confirm';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../stores/users/userSlice';

interface ResetPasswordInterface {
  userId: string;
}

const ResetPassword = (props: ResetPasswordInterface) => {
  const { userId } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { appendDialog } = useDialog();
  const { newPassword } = useSelector(
    (state: any) => state.users
  );

  const showDeleteDialog = () => {
    appendDialog(
      <ConfirmDialog
        title={t('dialog.reset_pass_title')}
        content={t('dialog.reset_pass_content')}
        submitBtnText={t('dialog.submit')}
        cancelBtnText={t('dialog.cancel')}
        onClick={handleResetPass}
      />
    );
  }

  const handleResetPass = () => {
    dispatch(resetPassword(userId));
  }

  const renderContent = () => {
    return newPassword 
      ? <span>{t('users.new_password')}<span className={style.newPass}>{newPassword}</span></span> 
      : <span>{t('users.reset_password')}</span>;
  };

  return (
    <div className={style.resetContainer}>
      {renderContent()}
      <Button
        variant="danger"
        label={t('dialog.reset_pass')}
        handleFuncion={showDeleteDialog}
      />
    </div>
  );
};

export default ResetPassword;
