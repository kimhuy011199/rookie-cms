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
import { tagType } from '../../stores/tags/tagType';
import { getPaginationTags, reset } from '../../stores/tags/tagSlice';

const Tags = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const searchValue = searchParams.get('search') || '';

  const { tags, isLoading, isError } = useSelector((state: any) => state.tags);

  useEffect(() => {
    if (isError === tagType.GET_PAGINATION_TAGS) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  useEffect(() => {
    const queryString = `page=${currentPage}&search=${searchValue}`;
    dispatch(getPaginationTags(queryString));

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
            heading={t('tags.heading')}
            addContentText={t('tags.new')}
            addContentLink="/tags/new"
          />
          {tags?.list?.length > 0 && (
            <ContentList data={tags} type={CONTENT_TYPE.TAG} />
          )}
        </div>
      </div>
    </>
  );
};

export default Tags;
