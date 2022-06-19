import React from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './style.module.css';

import Questions from '.';
import Tab from '../../shared/components/Tab';

const QuestionsRoutes = () => {
  return (
    <div className={style.pageContainer}>
      <Tab />
      <Routes>
        <Route path="/" element={<Questions />} />
      </Routes>
    </div>
  );
};

export default QuestionsRoutes;
