import React from 'react';
import { useSelector } from 'react-redux';
import {
  userSelector
} from '../../features/user/userSlice';

// ROUTING
import { Route, Redirect } from 'react-router-dom';

const SignUpAndLoginRoute = ({ component: Component, ...rest }) => {
  // Don't ask me why, but this needs to be a parameter for redirect to work on SignUp, despite not ever changing state to true.
  const { isLoggedIn } = useSelector(userSelector)

  console.log(isLoggedIn)
  return (
    <Route
      {...rest}
      render={rest => {
        if (isLoggedIn || localStorage.getItem('token')) {
          return <Redirect to="/" />;
        } else {
          return <Component {...rest} />;
        }
      }}
    />
  );
};

export default SignUpAndLoginRoute;