import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserByUsername,
  userSelector
} from '../../../features/user/userSlice';

// ROUTING
import { Redirect, Route } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// --------------------------------- USER ROUTE -------------------------------------
// ----------------------------------------------------------------------------------

const UserRoute = ({ component: Component, location, ...rest }) => {
  const dispatch = useDispatch();
  const { user_admin } = useSelector(userSelector)
  const [user, setUser] = useState({})

  useEffect(() => {
    dispatch(fetchUserByUsername(rest.computedMatch.params.username))
      .then(res => {
        setUser(res.payload)
      })
  }, [rest.computedMatch.params.username])

  return (
    <>
      {/* IF A USER ADMIN IS TRYING TO ACCESS A BANNED USERS PROFILE, LET THEM */}
      {user && user_admin && localStorage.getItem('token') ? (
        <Route {...rest} />
        // IF THE USER IS BANNED FROM THE SITE, DON'T LET THEM VIEW THEIR PROFILE
      ) : user && user.is_banned ? (
        <Redirect to='/banned' />
        // OTHERWISE DIRECT TO THE PATH
      ) : user ? (
        <Route {...rest} />
        // IF ALL ELSE FAILS, THE USER DOES NOT EXIST, SO REROUTE TO HOMEPAGE
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default UserRoute;