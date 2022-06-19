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
  deleteTag,
  getTagById,
  updateTag,
} from '../../../stores/tags/tagSlice';
import { tagType } from '../../../stores/tags/tagType';
import TagForm from '../../../shared/components/TagForm';

const EditTag = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { appendDialog } = useDialog();

  const { tag, isLoading, isError, message, isSuccess } = useSelector(
    (state: any) => state.tags
  );

  const showDeleteDialog = () => {
    const handleDelete = () => {
      if (tag?._id) {
        dispatch(deleteTag(tag?._id));
      }
    };
    appendDialog(
      <DeleteEntryDialog
        submitDelete={handleDelete}
        title={t('dialog.delete_tag')}
        content={t('dialog.delete_tag_content')}
      />
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(getTagById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isSuccess === tagType.UPDATE_TAG) {
      toast(t('toast.update_tag_success'));
      navigate('/tags');
    }
    if (isSuccess === tagType.DELETE_TAG) {
      toast(t('toast.delete_tag_success'));
      navigate('/tags');
    }
  }, [isSuccess, navigate, tag, t]);

  useEffect(() => {
    if (
      isError === tagType.GET_TAG ||
      isError === tagType.UPDATE_TAG ||
      isError === tagType.DELETE_TAG
    ) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  const submitForm = (data: any) => {
    const { tagName: name } = data;
    dispatch(updateTag({ id: tag._id, updatedData: { name } }));
  };

  return (
    <>
      <Spinner isLoading={isLoading} />
      <Error
        show={isError && message?.errorCode === 404}
        code={ERROR_CODE.NOT_FOUND}
      />
      {tag && (
        <>
          <div className={style.container}>
            <h2 className={style.heading}>{t('tags.update_current_tag')}</h2>
            <TagForm submitFunc={submitForm} tagName={tag.name} />
            <DeleteEntry
              showDeleteDialog={showDeleteDialog}
              content={t('tags.delete_tag')}
            />
          </div>
        </>
      )}
    </>
  );
};

export default EditTag;
