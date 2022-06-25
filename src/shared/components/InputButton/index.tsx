import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  INPUT_BUTTON_ACTION,
  SEARCH_TYPE,
  USER_FOR,
} from '../../constants/enums';
import PreviewDialog from '../Dialog/dialogs/preview-dialog';
import SearchEntryDialog from '../Dialog/dialogs/search-entry';
import UploadAvatarDialog from '../Dialog/dialogs/upload-avatar';
import UserProfileDialog from '../Dialog/dialogs/user-profile';
import UsersLikeDialog from '../Dialog/dialogs/users-like';
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
      case INPUT_BUTTON_ACTION.VIEW_USERS_LIKE:
        appendDialog(<UsersLikeDialog />);
        break;
      case INPUT_BUTTON_ACTION.VIEW_USER:
        if (entry) {
          appendDialog(<UserProfileDialog user={entry} />);
        }
        break;
      default:
    }
  };

  const handleAction = () => {
    switch (actionType) {
      case INPUT_BUTTON_ACTION.CHANGE_QUESTION:
        appendDialog(<SearchEntryDialog type={SEARCH_TYPE.QUESTION} />);
        break;
      case INPUT_BUTTON_ACTION.CHANGE_USER_QUESTION:
        appendDialog(
          <SearchEntryDialog
            type={SEARCH_TYPE.USER}
            userFor={USER_FOR.QUESTION}
          />
        );
        break;
      case INPUT_BUTTON_ACTION.CHANGE_USER_ANSWER:
        appendDialog(
          <SearchEntryDialog
            type={SEARCH_TYPE.USER}
            userFor={USER_FOR.ANSWER}
          />
        );
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
