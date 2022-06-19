import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../shared/components/Spinner';
import { getQuestions, reset } from '../../stores/questions/questionSlice';
import style from './style.module.css';
import { Question } from '../../shared/constants/types/Question';
import QuestionItem from '../../shared/components/QuestionItem';
import Pagination from '../../shared/components/Pagination';
import { useTranslation } from 'react-i18next';
import SearchQuestionGuide from '../../shared/components/SearchQuestionGuide';
import { questionType } from '../../stores/questions/questionType';
import { toast } from 'react-toastify';

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
          <div className={style.header}>{resultContent()}</div>
          {questions?.questionsList?.length > 0 ? (
            <>
              <div className={style.questions}>
                <ul className={style.questionsList}>
                  {questions?.questionsList.map((question: Question) => (
                    <li key={question._id}>
                      <QuestionItem question={question} />
                    </li>
                  ))}
                </ul>
              </div>
              {questions.totalPages > 1 && (
                <div className={style.pagination}>
                  <Pagination {...questions} />
                </div>
              )}
            </>
          ) : (
            <p className={style.noQuestions}>{t('questions.no_questions')}</p>
          )}
        </div>
        <SearchQuestionGuide />
      </div>
    </>
  );
}

export default Questions;
