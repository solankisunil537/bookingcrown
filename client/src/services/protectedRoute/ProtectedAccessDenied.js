import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../features/user/UserSlice';
import useToken from 'antd/es/theme/useToken';
import Loader from '../../common/Loader';
import dayjs from 'dayjs';

const ProtectedAccessDenied = ({ element: Component, ...rest }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [canAccess, setCanAccess] = useState(false);
    const dispatch = useDispatch();
    const token = useToken()
    const { user, status } = useSelector((state) => state.user);

    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            setCanAccess(false);
            return
        }

        if (status === 'idle') {
            dispatch(fetchUserData());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (status === 'succeeded' && user.plan) {
            const currentDate = dayjs().startOf('day');
            const planEndDate = dayjs(user.plan.endDate).startOf('day');

            if (planEndDate.isAfter(currentDate)) {
                setCanAccess(false);
            } else {
                setCanAccess(true);
            }
            setIsLoading(false);
        } else {
            setCanAccess(true)
        }
    }, [status, user]);

    if (isLoading) {
        return <Loader />
    }

    if (!canAccess) {
        return <Component {...rest} />;
    }

    return <Navigate to="/user/dashboard" />;
};

export default ProtectedAccessDenied;
