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
import { paginateUsers, reset } from '../../stores/users/userSlice';

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
    if (isError === userType.PAGINATE_USERS) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  useEffect(() => {
    const queryString = `page=${currentPage}&search=${searchValue}`;
    dispatch(paginateUsers(queryString));

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, currentPage, searchValue]);

  return (
    <>
      <Spinner isLoading={isLoading} />
      <div className={style.container}>
        <div className={style.main}>
          <Heading type={CONTENT_TYPE.USER} entriesFound={users?.totalItems} />
          {users?.list && <ContentList data={users} type={CONTENT_TYPE.USER} />}
        </div>
      </div>
    </>
  );
};

export default Users;
