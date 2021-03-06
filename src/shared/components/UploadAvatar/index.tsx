import React, { useEffect, useState } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { reset, uploadImg } from '../../../stores/uploads/uploadSlice';
import {
  reset as resetUpdateUser,
  updateUser,
} from '../../../stores/auth/authSlice';
import {
  reset as resetUpdateEntry,
  updateAvatar,
} from '../../../stores/users/userSlice';
import style from './style.module.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DefaultAvatar } from '../../../assets/images/avatar.svg';
import { authType } from '../../../stores/auth/authType';
import { uploadType } from '../../../stores/uploads/uploadType';
import LoadingIcon from '../LoadingIcon';
import { User } from '../../constants/types/User';

interface UploadAvatarInterface {
  changeEntryAvatar?: boolean;
  currentEntry?: User;
}

const UploadAvatar = (props: UploadAvatarInterface) => {
  const { changeEntryAvatar = false, currentEntry } = props;
  const [inputValue, setInputValue] = useState<any>('');
  const [previewImgSrc, setPreviewImgSrc] = useState<any>('');
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isLargeFile, setIsLargeFile] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    user,
    isSuccess: isUpdateSuccess,
    isLoading: isUpdateLoading,
  } = useSelector((state: any) => state.auth);
  const { isSuccess: isEntrySuccess, isLoading: isEntryLoading } = useSelector(
    (state: any) => state.users
  );
  const { data, isLoading, isSuccess } = useSelector(
    (state: any) => state.upload
  );

  const handleInputValueChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setIsLargeFile(file.size >= 200000);
    previewFile(file);
    setSelectedFile(file);
    setInputValue(e.target.value);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImgSrc(reader.result);
    };
  };

  const handleSubmitFile = () => {
    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      if (reader.result) {
        uploadImage(reader.result);
      }
    };
    reader.onerror = () => {};
  };

  const uploadImage = async (base64EncodedImage: string | ArrayBuffer) => {
    try {
      // Upload image to cloudinary
      dispatch(uploadImg({ data: base64EncodedImage }));
      setInputValue('');
    } catch (err) {}
  };

  useEffect(() => {
    if (isSuccess === uploadType.UPLOAD_IMG) {
      // Update user when uploading image to cloudinary is done
      if (changeEntryAvatar && currentEntry) {
        dispatch(
          updateAvatar({
            id: currentEntry._id,
            updatedData: { avatarImg: data.url },
          })
        );
      } else {
        dispatch(updateUser({ _id: user._id, avatarImg: data.url }));
      }
    }

    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (
      !isUpdateLoading &&
      isUpdateSuccess === authType.UPDATE_USER &&
      isSuccess === uploadType.UPLOAD_IMG
    ) {
      toast(t('toast.update_avatar_success'));
    }

    return () => {
      if (changeEntryAvatar && currentEntry) {
        dispatch(resetUpdateEntry());
      } else {
        dispatch(resetUpdateUser());
      }
    };
  }, [
    t,
    isSuccess,
    isUpdateSuccess,
    isUpdateLoading,
    isEntrySuccess,
    isEntryLoading,
    dispatch,
    changeEntryAvatar,
    currentEntry,
  ]);

  return (
    <>
      <div className={style.container}>
        <div className={style.imgContainer}>
          {(!currentEntry?.avatarImg || !user?.avatarImg) && !previewImgSrc && (
            <DefaultAvatar className={style.preview} />
          )}
          {changeEntryAvatar && currentEntry?.avatarImg && !previewImgSrc && (
            <img
              src={currentEntry?.avatarImg}
              alt="avatar"
              className={style.preview}
            />
          )}
          {!changeEntryAvatar && user?.avatarImg && !previewImgSrc && (
            <img src={user?.avatarImg} alt="avatar" className={style.preview} />
          )}
          {previewImgSrc && (
            <img src={previewImgSrc} alt="avatar" className={style.preview} />
          )}
        </div>
        {!isLoading ? (
          <label htmlFor="avatar" className={style.input}>
            <span className={style.tooltip}>
              {t('settings.label.choose_image')}
            </span>
          </label>
        ) : (
          <div className={style.loading}>
            <LoadingIcon />
          </div>
        )}
        <input
          hidden
          type="file"
          name="avatar"
          id="avatar"
          disabled={isLoading}
          onChange={handleInputValueChange}
          value={inputValue}
        />
        <button
          className={style.submit}
          onClick={handleSubmitFile}
          disabled={!selectedFile || isLoading || !inputValue || isLargeFile}
        >
          <MdCameraAlt className={style.icon} />
        </button>
      </div>
      {isLargeFile && (
        <div className={style.largeFile}>
          <span>{t('upload.limit_size')}</span>
        </div>
      )}
    </>
  );
};

export default UploadAvatar;
