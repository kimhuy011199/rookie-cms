import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { USER_ROLE } from '../../shared/constants/enums';

import Login from './login';

const AuthRoutes = () => {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    user && user?.role === USER_ROLE.ADMIN && navigate('/questions');
  }, [user, navigate]);

  return (
    <div className={style.auth}>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AuthRoutes;
