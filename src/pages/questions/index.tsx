import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../shared/components/Spinner';
import { getQuestions, reset } from '../../stores/questions/questionSlice';
import style from './style.module.css';
import Pagination from '../../shared/components/Pagination';
import { useTranslation } from 'react-i18next';
import { questionType } from '../../stores/questions/questionType';
import { toast } from 'react-toastify';
import Heading from '../../shared/components/Heading';
import ContentList from '../../shared/components/ContentList';
import { CONTENT_TYPE } from '../../shared/constants/enums';

function Questions() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const searchValue = searchParams.get('search') || '';

  const { questions, isLoading, isError } = useSelector(
    (state: any) => state.questions
  );

  const resultContent = () => {
    if (!searchValue) {
      return <h2 className={style.heading}>{t('questions.all_questions')}</h2>;
    }

    return (
      <>
        <h2 className={style.heading}>{t('questions.search.result_title')}</h2>
        <p className={style.desc}>
          {t('questions.search.result_for')}
          <span className={style.searchValue}>{searchValue}</span>
        </p>
      </>
    );
  };

  useEffect(() => {
    if (isError === questionType.GET_ALL_QUESTIONS) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  useEffect(() => {
    const queryString = `page=${currentPage}&search=${searchValue}`;
    dispatch(getQuestions(queryString));

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
            heading={t('questions.heading')}
            addContentText={t('questions.new')}
            addContentLink="/question/new"
          />
          {questions?.list?.length > 0 && (
            <ContentList data={questions} type={CONTENT_TYPE.QUESTION} />
          )}
        </div>
      </div>
    </>
  );
}

export default Questions;
