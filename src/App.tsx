import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUserMe } from './stores/auth/authSlice';
import authStorageService from './core/authStorage.service';

import Header from './shared/layout/Header';
import Footer from './shared/layout/Footer';
import UsersRoutes from './pages/users/users.routes';
import AuthRoutes from './pages/auth/auth.routes';
import QuestionsRoutes from './pages/questions/questions.routes';

export default function App() {
  const token = authStorageService().getToken();
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!token) {
      navigate('/auth/login');
    }
    if (token && !user?._id) {
      dispatch(getUserMe());
    }
  }, [user, dispatch, token, pathname, navigate]);

  return (
    <>
      <div className="page">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="/questions/*" element={<QuestionsRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/users/*" element={<UsersRoutes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
