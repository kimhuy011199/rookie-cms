import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuestionById } from '../../../stores/questions/questionSlice';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import { COMMENT_TYPE, ERROR_CODE } from '../../../shared/constants/enums';
import Comment from '../../../shared/components/Comment';
import CommentInput from '../../../shared/components/CommentInput';
import { getAnswers } from '../../../stores/answers/answerSlice';
import { Answer } from '../../../shared/constants/types/Answer';
import RecommendQuestion from '../../../shared/components/RecommendQuestion';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { questionType } from '../../../stores/questions/questionType';

const SingleQuestion = () => {
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { question, isLoading, isError, message } = useSelector(
    (state: any) => state.questions
  );
  const { answers, isAnswersLoading } = useSelector(
    (state: any) => state.answers
  );

  useEffect(() => {
    if (id) {
      dispatch(getQuestionById(id));
      dispatch(getAnswers(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isError === questionType.GET_QUESTION_BY_ID) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, t]);

  return (
    <>
      <Spinner isLoading={isLoading || isAnswersLoading} />
      <Error
        show={isError && message?.errorCode === 404}
        code={ERROR_CODE.NOT_FOUND}
      />
      {question?._id && (
        <>
          <div className={style.container}>
            <div className={style.main}>
              <h2 className={style.heading}>{question.title}</h2>
              <div className={style.question}>
                <Comment type={COMMENT_TYPE.QUESTION} data={question} />
              </div>
              {answers.length > 0 && (
                <ul className={style.answers}>
                  {answers.map((answer: Answer) => (
                    <li key={answer._id}>
                      <Comment type={COMMENT_TYPE.COMMENT} data={answer} />
                    </li>
                  ))}
                </ul>
              )}
              <div className={style.comment}>
                <CommentInput type={COMMENT_TYPE.COMMENT} questionId={id} />
              </div>
            </div>
            <div className={style.recommandation}>
              <RecommendQuestion questionId={id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleQuestion;
