import React from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './style.module.css';
import Tab from '../../shared/components/Tab';

import Users from '.';
import NewUser from './new';
import EditUser from './edit';

const UsersRoutes = () => {
  return (
    <div className={style.pageContainer}>
      <Tab />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/new" element={<NewUser />} />
        <Route path="/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
};

export default UsersRoutes;
