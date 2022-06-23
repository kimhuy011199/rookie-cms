import React from 'react';
import { useTranslation } from 'react-i18next';
import { CONTENT_TYPE, INPUT_BUTTON_ACTION } from '../../constants/enums';
import PreviewDialog from '../Dialog/dialogs/preview-dialog';
import SearchQuestionDialog from '../Dialog/dialogs/search-question';
import UploadAvatarDialog from '../Dialog/dialogs/upload-avatar';
import UserProfileDialog from '../Dialog/dialogs/user-profile';
import { useDialog } from '../Dialog/Provider';
import style from './style.module.css';

interface InputButtonInterface {
  entry: any;
  viewType?: string;
  actionType?: string;
  content: any;
}

const InputButton = (props: InputButtonInterface) => {
  const { entry, viewType, actionType, content } = props;
  const { t } = useTranslation();
  const { appendDialog } = useDialog();
  const handleInfo = () => {
    switch (viewType) {
      case INPUT_BUTTON_ACTION.VIEW_QUESTION:
        appendDialog(<PreviewDialog {...entry} />);
        break;
      case INPUT_BUTTON_ACTION.VIEW_USER:
        appendDialog(<UserProfileDialog user={entry} />);
        break;
      default:
    }
  };

  const handleAction = () => {
    switch (actionType) {
      case INPUT_BUTTON_ACTION.CHANGE_QUESTION:
        appendDialog(<SearchQuestionDialog />);
        break;
      case INPUT_BUTTON_ACTION.CHANGE_AVATAR:
        appendDialog(<UploadAvatarDialog user={entry} />);
        break;
      default:
    }
  };

  return (
    <div className={style.input}>
      <span>{content}</span>
      <div className={style.actions}>
        {actionType && (
          <button type="button" onClick={handleAction} className={style.action}>
            {t('common.change')}
          </button>
        )}
        {viewType && (
          <button type="button" onClick={handleInfo} className={style.info}>
            {t('common.view_info')}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputButton;
