import React from 'react';
import { useTranslation } from 'react-i18next';
import UserProfileDialog from '../Dialog/dialogs/user-profile';
import { useDialog } from '../Dialog/Provider';
import style from './style.module.css';

interface ViewInfoInputInterface {
  previewEntry: any;
  type: string;
}

const ViewInfoInput = (props: ViewInfoInputInterface) => {
  const { previewEntry, type } = props;
  const { t } = useTranslation();
  const { appendDialog } = useDialog();
  const handleViewInfo = () => {
    appendDialog(<UserProfileDialog user={previewEntry} />);
  };

  const handleViewAction = () => {};

  return (
    <div className={style.input}>
      <span>{previewEntry?._id}</span>
      <div className={style.actions}>
        <button
          type="button"
          onClick={handleViewInfo}
          className={style.viewInfo}
        >
          {t('common.view_info')}
        </button>
      </div>
    </div>
  );
};

export default ViewInfoInput;
