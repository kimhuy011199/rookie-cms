import React from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './style.module.css';
import Tab from '../../shared/components/Tab';

import Tags from '.';
import NewTag from './new';
import EditTag from './edit';

const TagsRoutes = () => {
  return (
    <div className={style.pageContainer}>
      <Tab />
      <Routes>
        <Route path="/" element={<Tags />} />
        <Route path="/new" element={<NewTag />} />
        <Route path="/:id" element={<EditTag />} />
      </Routes>
    </div>
  );
};

export default TagsRoutes;
