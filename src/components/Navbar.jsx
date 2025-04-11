import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/dashboard" className="hover:underline">🔥 MyApp</Link>
      </h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.name}</span>
            <Link to="/dashboard" className="mr-4 text-blue-300 hover:underline">Dashboard</Link>
            <Link to="/add-utility" className="mr-4 text-blue-300 hover:underline">Add Utility</Link>
            <Link to="/list-utility" className="mr-4 text-blue-300 hover:underline">View Utility</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="mr-4 text-blue-300 hover:underline">Login</Link>
            <Link to="/register" className="text-blue-300 hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
