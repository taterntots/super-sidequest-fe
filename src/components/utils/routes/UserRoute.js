import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchUserByUsername
} from '../../../features/user/userSlice';

// ROUTING
import { Redirect, Route } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// --------------------------------- USER ROUTE -------------------------------------
// ----------------------------------------------------------------------------------

const UserRoute = ({ component: Component, location, ...rest }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({})

  useEffect(() => {
    dispatch(fetchUserByUsername(rest.computedMatch.params.username))
      .then(res => {
        setUser(res.payload)
      })
  }, [rest.computedMatch.params.username])

  return (
    <>
      {/* IF THE USER IS BANNED FROM THE SITE, DON'T LET THEM VIEW THEIR PROFILE */}
      {user && user.is_banned ? (
        <Redirect to='/banned' />
      ) : user ? (
        <Route {...rest} />
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default UserRoute;