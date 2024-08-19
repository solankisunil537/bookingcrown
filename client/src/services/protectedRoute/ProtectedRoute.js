import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUserRole } from '../authService/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../features/user/UserSlice';
import Loader from '../../common/Loader';
import dayjs from 'dayjs';

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(true);
    const dispatch = useDispatch();
    const { user, status } = useSelector((state) => state.user);
    const token = getToken();
    const userRole = getUserRole();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUserData());
        }
    }, [dispatch, status]);

    useEffect(() => {
        const checkAccess = () => {
            if (!token) {
                setIsLoading(false);
                setHasAccess(false);
                return;
            }

            if (status === 'succeeded' && user.plan && user.plan?.endDate) {
                const currentDate = dayjs().startOf('day');
                const planEndDate = dayjs(user.plan?.endDate).startOf('day');

                if (planEndDate.isBefore(currentDate)) {
                    setHasAccess(false);
                } else {
                    setHasAccess(true);
                }
            } else {
                setHasAccess(true);
            }

            setIsLoading(false);
        };

        checkAccess();
    }, [token, user, status]);

    if (isLoading) {
        return <Loader />;
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" />;
    }

    if (!hasAccess) {
        return <Navigate to="/access-denied" />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
