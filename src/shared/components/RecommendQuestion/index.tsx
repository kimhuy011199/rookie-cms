import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendQuestions } from '../../../stores/questions/questionSlice';
import List from '../List';
import QuestionLinkItem from '../QuestionLinkItem';

interface RecommendQuestionInterface {
  questionId: string;
}

const RecommendQuestion = (props: RecommendQuestionInterface) => {
  const { questionId } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { recommend } = useSelector((state: any) => state.questions);

  useEffect(() => {
    if (questionId) {
      dispatch(getRecommendQuestions(questionId));
    }
  }, [questionId, dispatch]);

  return (
    <List
      data={recommend}
      heading={t('questions.recommendation')}
      emptyListContent={t('questions.no_questions')}
    >
      <QuestionLinkItem />
    </List>
  );
};

export default RecommendQuestion;
