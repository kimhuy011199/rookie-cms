import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../shared/components/Spinner';
import { getQuestions, reset } from '../../stores/questions/questionSlice';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { questionType } from '../../stores/questions/questionType';
import { toast } from 'react-toastify';
import Heading from '../../shared/components/Heading';
import ContentList from '../../shared/components/ContentList';
import { CONTENT_TYPE } from '../../shared/constants/enums';

const Questions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const searchValue = searchParams.get('search') || '';

  const { questions, isLoading, isError } = useSelector(
    (state: any) => state.questions
  );

  useEffect(() => {
    if (isError === questionType.PAGINATE_QUESTIONS) {
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
            type={CONTENT_TYPE.QUESTION}
            entriesFound={questions?.totalItems}
          />
          {questions?.list && (
            <ContentList data={questions} type={CONTENT_TYPE.QUESTION} />
          )}
        </div>
      </div>
    </>
  );
};

export default Questions;
