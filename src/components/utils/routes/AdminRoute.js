import React from 'react';
import { useSelector } from 'react-redux';
import {
  userSelector
} from '../../../features/user/userSlice';

// ROUTING
import { Redirect, Route } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// -------------------------------- ADMIN ROUTE -------------------------------------
// ----------------------------------------------------------------------------------

const AdminRoute = ({ component: Component, location, ...rest }) => {
  const { user_admin } = useSelector(userSelector)

  return (
    <>
      {user_admin && localStorage.getItem('token') ? (
        <Route {...rest} />
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default AdminRoute;
