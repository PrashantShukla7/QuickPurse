// components/ProtectedRoute.js
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>; // Or a spinner component

    return isAuthenticated ? children : <Navigate to='/login'/>;
  };

export default ProtectedRoute;