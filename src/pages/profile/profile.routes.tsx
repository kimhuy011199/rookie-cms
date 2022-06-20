import React from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './style.module.css';

import UserSetting from './settings';
import ChangePassword from './password';

const ProflieRoutes = () => {
  return (
    <div className={style.users}>
      <Routes>
        <Route path="/settings" element={<UserSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </div>
  );
};

export default ProflieRoutes;
