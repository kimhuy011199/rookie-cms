import React from 'react';
import { Link } from 'react-router-dom';
import { Question } from '../../constants/types/Question';
import style from './style.module.css';

interface QuestionLinkItemInterface {
  item?: Question;
}

const QuestionLinkItem = (props: QuestionLinkItemInterface) => {
  const { item } = props;
  const generateLink = (_id: string) => `/questions/${_id}`;

  if (!item) {
    return <></>;
  }

  return (
    <>
      <div className={style.question}>
        <Link className={style.link} to={generateLink(item._id)}>
          <h3 className={style.title}>{item.title}</h3>
          <p className={style.content}>{item.content}</p>
        </Link>
      </div>
    </>
  );
};

export default QuestionLinkItem;
