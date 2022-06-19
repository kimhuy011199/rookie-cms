import React from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './style.module.css';
import Tab from '../../shared/components/Tab';

import Questions from '.';
import NewQuestion from './new';
import EditQuestion from './edit';

const QuestionsRoutes = () => {
  return (
    <div className={style.pageContainer}>
      <Tab />
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="/new" element={<NewQuestion />} />
        <Route path="/:id" element={<EditQuestion />} />
      </Routes>
    </div>
  );
};

export default QuestionsRoutes;
