import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  userSelector
} from '../features/user/userSlice';

// ROUTING
import { Route, Link } from 'react-router-dom';

// COMPONENTS
import UserList from '../features/user/UserList';
import UserLeaderboard from '../features/user/UserLeaderboard';

// ----------------------------------------------------------------------------------
// --------------------------------- USER LIST PAGE----------------------------------
// ----------------------------------------------------------------------------------

const UserListPage = ({ searchTerm, refresh, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const { users } = useSelector(userSelector)
  const url = window.location.href; // GRABS REFERENCE TO THE CURRENT URL TO CHECK WHICH TAB TO SELECT FOR STYLING

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch, refresh])

  return (
    <>
      {/* TAB CONTENT */}
      <div className='flex flex-row items-center justify-start text-xl text-white'>
        {/* ALL USERS */}
        <Link
          to={`/users`}
          onClick={() => handleClearSearchBar()}
          className={url.includes('users') && !url.includes('leaderboard') ?
            'px-5 hover:text-navbarbuttonhighlight bg-profileone rounded-t-md' :
            'px-5 hover:text-navbarbuttonhighlight bg-graybutton rounded-t-md'}
        >
          Users
        </Link>
        {/* USER LEADERBOARD */}
        <Link
          to={`/users/leaderboard`}
          onClick={() => handleClearSearchBar()}
          className={url.includes('leaderboard') && url.includes('users') ?
            'px-5 hover:text-navbarbuttonhighlight bg-profileone rounded-t-md' :
            'px-5 hover:text-navbarbuttonhighlight bg-graybutton rounded-t-md'}
        >
          Leaderboard
        </Link>
      </div>

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
          <Route
            exact
            path={`/users/leaderboard`}
            render={(props) => (
              <UserLeaderboard
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