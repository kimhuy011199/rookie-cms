import React from 'react';
import { Link } from 'react-router-dom';
import { formatMonthDateYear } from '../../../core/utils';
import { Question } from '../../constants/types/Question';
import TagList from '../TagList';
import style from './style.module.css';

interface QuestionItemInterface {
  question: Question;
}

const QuestionItem = (props: QuestionItemInterface) => {
  const { question } = props;
  const info = `by ${
    question.user.displayName
  }, created on ${formatMonthDateYear(question.createdAt)}`;
  const linkTo = `/questions/${question._id}`;

  return (
    <div className={style.main}>
      <Link className={style.link} to={linkTo}>
        <h3 className={style.title}>{question.title}</h3>
        <p className={style.content}>{question.content}</p>
        <div className={style.footer}>
          {question.tags?.length > 0 && <TagList tagList={question.tags} />}
          <span className={style.info}>{info}</span>
        </div>
      </Link>
    </div>
  );
};

export default QuestionItem;
