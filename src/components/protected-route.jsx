import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserAuth } from '../context/authContext';
import Loading from './loading/loading';

const PrivateRoute = () => {
    const { loading, authData } = UserAuth()
    const location = useLocation()
    console.log(location.pathname)

    return (
        !!loading ? <Loading /> : !!authData ? <Outlet /> : <Navigate to='/login' state={{ previousUrl: location.pathname }} />
    );
};

export default PrivateRoute;