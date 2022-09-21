import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import AuthService from 'src/services/authService';

const PrivateRoute = () => {
    const isLogin = AuthService.isLoggedIn();
    return isLogin ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;