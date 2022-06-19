import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import { ERROR_CODE } from '../../../shared/constants/enums';
import { useTranslation } from 'react-i18next';
import Avatar from '../../../shared/components/Avatar';
import List from '../../../shared/components/List';
import UserInfoItem from './components/UserInfoItem';
import { authType } from '../../../stores/auth/authType';

const SingleUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { user, isLoading, isError, message } = useSelector(
    (state: any) => state.auth
  );

  const { userQuestions } = useSelector((state: any) => state.questions);

  const userInfo = {
    display_name: user.displayName,
    email: user.email,
    github: user.linkGithub,
    linkedin: user.linkLinkedIn,
    about: user.about,
  };
  const userInfoEntries = Object.entries(userInfo);

  return <></>;
};

export default SingleUser;
