import React from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './style.module.css';

import Questions from '.';

const QuestionsRoutes = () => {
  return (
    <div className={style.pageContainer}>
      <div className={style.tabs}></div>
      <Routes>
        <Route path="/" element={<Questions />} />
      </Routes>
    </div>
  );
};

export default QuestionsRoutes;
