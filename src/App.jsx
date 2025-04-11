import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadUserFromStorage } from './features/auth/authSlice';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UtilityForm from './pages/UtilityForm';
import UtilityList from './pages/UtilityList';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <Router>
      {user && <Navbar />} {/* Navbar will only show when logged in */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path='/add-utility'
          element={<ProtectedRoute><UtilityForm /></ProtectedRoute>}
        />
        <Route
          path='/list-utility'
          element={<ProtectedRoute><UtilityList /></ProtectedRoute>}
        />
      </Routes>
      <ToastContainer position='top-right' autoClose={3000} />
    </Router>
  );
}

export default App;
