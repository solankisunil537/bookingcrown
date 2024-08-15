import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUserRole } from '../authService/AuthService';

const ProtectedAdminRoute = ({ element: Component, requiredRole, ...rest }) => {
    const token = getToken();
    const userRole = getUserRole();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" />;
    }

    return <Component {...rest} />;
};

export default ProtectedAdminRoute;
