import React from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './style.module.css';
import Tab from '../../shared/components/Tab';

import Answers from '.';
import NewAnswer from './new';
import EditAnswer from './edit';

const AnswersRoutes = () => {
  return (
    <div className={style.pageContainer}>
      <Tab />
      <Routes>
        <Route path="/" element={<Answers />} />
        <Route path="/new" element={<NewAnswer />} />
        <Route path="/:id" element={<EditAnswer />} />
      </Routes>
    </div>
  );
};

export default AnswersRoutes;
