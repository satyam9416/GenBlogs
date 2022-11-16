import React from 'react';
import { Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { UserAuth } from '../context/authContext';
import Loading from './loading/loading';

const PrivateRoute = () => {
    const { loading, authData } = UserAuth()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    let params = {};

    for (const entry of searchParams.entries()) {
        const [param, value] = entry;
        params = { ...params, [param]: value }
    }

    const state = {
        previousURL: location.pathname,
        params
    }

    return (
        loading !== false ? <Loading /> : authData ? <Outlet /> : <Navigate to='/signup' state={state} />
    );
};

export default PrivateRoute;