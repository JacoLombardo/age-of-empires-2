import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader/Loader';

function ProtectedRoute({children}) {

    const { user, loading } = useContext(AuthContext);

    return (
        <>
            {loading ?
                (<div className="loaderDiv">
                    <Loader />
                </div>) : (
                    user ? children : <Navigate to="/" />
                )}
        </>
  )
}

export default ProtectedRoute