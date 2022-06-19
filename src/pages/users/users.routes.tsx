import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import style from './style.module.css';
import { ERROR_CODE } from '../../shared/constants/enums';
import Error from '../../shared/components/Error';

import SingleUser from './single';
import UserSetting from './settings';
import ChangePassword from './password';

const UsersRoutes = () => {
  const { user } = useSelector((state: any) => state.auth);

  if (!user) {
    return <Error code={ERROR_CODE.UNAUTHENTICATED} />;
  }

  return (
    <div className={style.users}>
      <Routes>
        <Route path="/settings" element={<UserSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/:id" element={<SingleUser />} />
      </Routes>
    </div>
  );
};

export default UsersRoutes;
