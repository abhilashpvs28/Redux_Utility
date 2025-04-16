// AppContent.jsx
import React, { useEffect, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "./features/auth/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load the pages
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const UtilityForm = React.lazy(() => import("./pages/UtilityForm"));
const UtilityList = React.lazy(() => import("./pages/UtilityList"));

function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  if (isLoading) return null;

  const hideNavbarPaths = ["/", "/login", "/register"];
  const shouldShowNavbar = user && !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-utility"
            element={
              <ProtectedRoute>
                <UtilityForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-utility"
            element={
              <ProtectedRoute>
                <UtilityList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default AppContent;
