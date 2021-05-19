import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  userSelector
} from './userSlice';

export function User() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(userSelector)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  // Error handling & map successful query data 
  const renderUsers = () => {
    if (loading) return <p>Loading users...</p>
    if (error) return <p>Cannot display users...</p>
    return users.map(user =>
      <div key={user.id} className='tile'>
        <h2>{user.id}</h2>
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-6xl'>Users</h1>
      <div>
        {renderUsers()}
      </div>
    </div>
  );
}