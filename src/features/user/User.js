import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import styles from './Counter.module.css';
import {
  fetchUsers,
  userSelector
} from './userSlice';

export function User() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(userSelector)

  useEffect(() => {
    dispatch(fetchUsers())
  }, dispatch)

  console.log(users)

  // error handling & map successful query data 
  const renderUsers = () => {
    if (loading) return <p>Loading users...</p>
    if (error) return <p>Cannot display users...</p>
    return users.map(user =>
      <div key={user.id} className='tile'>
        <h2>{user.id}</h2>
        {/* <img src={recipe.strMealThumb} alt='' /> */}
      </div>
    )
  }

  return (
    <div>
      <h1>Users</h1>
      <div>
        {renderUsers()}
      </div>
    </div>
  );
}