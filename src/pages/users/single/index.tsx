import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import { ERROR_CODE } from '../../../shared/constants/enums';
import { useTranslation } from 'react-i18next';
import Avatar from '../../../shared/components/Avatar';
import { getQuestionByUserId } from '../../../stores/questions/questionSlice';
import List from '../../../shared/components/List';
import QuestionLinkItem from '../../../shared/components/QuestionLinkItem';
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

  useEffect(() => {
    if (user._id) {
      dispatch(getQuestionByUserId(user._id));
    }
  }, [id, dispatch, user]);

  return (
    <>
      <Spinner isLoading={isLoading} />
      <Error
        show={isError === authType.GET_USER_ME && message?.errorCode === 404}
        code={ERROR_CODE.NOT_FOUND}
      />
      <div className={style.container}>
        <div className={style.avatar}>
          <Avatar user={user} size="lg" />
        </div>
        <div className={style.information}>
          <List
            data={userInfoEntries}
            heading={t('settings.heading.personal_info')}
          >
            <UserInfoItem />
          </List>
          <List
            data={userQuestions}
            heading={t('settings.heading.user_questions')}
            emptyListContent={t('questions.no_questions')}
          >
            <QuestionLinkItem />
          </List>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
