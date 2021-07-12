import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  userSelector
} from '../features/user/userSlice';

// ROUTING
import { Route } from 'react-router-dom';

// COMPONENTS
import UserList from '../features/user/UserList';

// ----------------------------------------------------------------------------------
// --------------------------------- USER LIST PAGE----------------------------------
// ----------------------------------------------------------------------------------

const UserListPage = ({ searchTerm, refresh, setRefresh, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const { users } = useSelector(userSelector)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch, refresh])

  return (
    <>
      {/* PAGE ELEMENTS BASED ON TAB */}
      <div className='p-4 rounded-md bg-profileone'>
        <div className='p-4 bg-profiletwo rounded-lg'>
          <Route
            exact
            path={`/users`}
            render={(props) => (
              <UserList
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                users={users}
                {...props}
              />
            )}
          />
        </div>
      </div>
    </>
  );
}

export default UserListPage;