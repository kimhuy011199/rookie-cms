import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../shared/components/Spinner';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Heading from '../../shared/components/Heading';
import ContentList from '../../shared/components/ContentList';
import { CONTENT_TYPE } from '../../shared/constants/enums';
import { userType } from '../../stores/users/userType';
import { getUsers, reset } from '../../stores/users/userSlice';

const Users = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const searchValue = searchParams.get('search') || '';

  const { users, isLoading, isError } = useSelector(
    (state: any) => state.users
  );

  useEffect(() => {
    if (isError === userType.GET_ALL_USERS) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  useEffect(() => {
    const queryString = `page=${currentPage}&search=${searchValue}`;
    dispatch(getUsers(queryString));

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, currentPage, searchValue]);

  return (
    <>
      <Spinner isLoading={isLoading} />
      <div className={style.container}>
        <div className={style.main}>
          <Heading
            heading={t('users.heading')}
            addContentText={t('users.new')}
            addContentLink="/users/new"
          />
          {users?.list?.length > 0 && (
            <ContentList data={users} type={CONTENT_TYPE.USER} />
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
