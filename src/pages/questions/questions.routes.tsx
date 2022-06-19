import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.css';
import { getTags } from '../../stores/tags/tagSlice';

import Questions from '.';
import AskQuestion from './ask';
import SingleQuestion from './single';
import EditQuestion from './edit';

const QuestionsRoutes = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state: any) => state.tags);

  useEffect(() => {
    if (!tags.length) {
      dispatch(getTags());
    }
  }, [tags, dispatch]);

  return (
    <div className={style.questions}>
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/:id" element={<SingleQuestion />} />
        <Route path="/:id/edit" element={<EditQuestion />} />
      </Routes>
    </div>
  );
};

export default QuestionsRoutes;
