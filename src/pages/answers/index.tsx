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
import { answerType } from '../../stores/answers/answerType';
import { paginateAnswers, reset } from '../../stores/answers/answerSlice';

const Answers = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const searchValue = searchParams.get('search') || '';

  const { answers, isLoading, isError } = useSelector(
    (state: any) => state.answers
  );

  useEffect(() => {
    if (isError === answerType.PAGINATE_ANSWERS) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  useEffect(() => {
    const queryString = `page=${currentPage}&search=${searchValue}`;
    dispatch(paginateAnswers(queryString));

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
            heading={t('answers.heading')}
            addContentText={t('answers.new')}
            addContentLink="/answers/new"
          />
          {answers?.list?.length > 0 && (
            <ContentList data={answers} type={CONTENT_TYPE.ANSWER} />
          )}
        </div>
      </div>
    </>
  );
};

export default Answers;
