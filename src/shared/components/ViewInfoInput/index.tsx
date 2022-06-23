import React from 'react';
import { useTranslation } from 'react-i18next';
import { CONTENT_TYPE } from '../../constants/enums';
import PreviewDialog from '../Dialog/dialogs/preview-dialog';
import SearchQuestionDialog from '../Dialog/dialogs/search-question';
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
    switch (type) {
      case CONTENT_TYPE.QUESTION:
        appendDialog(<PreviewDialog {...previewEntry} />);
        break;
      default:
        appendDialog(<UserProfileDialog user={previewEntry} />);
    }
  };

  const handleViewAction = () => {
    appendDialog(<SearchQuestionDialog />);
  };

  return (
    <div className={style.input}>
      <span>{previewEntry?._id}</span>
      <div className={style.actions}>
        {type === CONTENT_TYPE.QUESTION && (
          <button
            type="button"
            onClick={handleViewAction}
            className={style.change}
          >
            {t('common.change')}
          </button>
        )}
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
