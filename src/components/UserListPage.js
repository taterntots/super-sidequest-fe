import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  fetchBannedUsers,
  fetchUserAdminStatus,
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
  const { users, user_admin, banned_users } = useSelector(userSelector)
  const url = window.location.href; // GRABS REFERENCE TO THE CURRENT URL TO CHECK WHICH TAB TO SELECT FOR STYLING

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchBannedUsers())
    if (localStorage.getItem('id')) {
      dispatch(fetchUserAdminStatus(localStorage.getItem('id')))
    }
  }, [dispatch, refresh])

  return (
    <>
      {/* TAB CONTENT */}
      <div className='flex flex-row items-center justify-start text-xl text-white'>
        {/* ALL USERS */}
        <Link
          to={`/users`}
          onClick={() => handleClearSearchBar()}
          className={url.includes('users') && !url.includes('leaderboard') && !url.includes('banned') ?
            'px-5 hover:text-navbarbuttonhighlight bg-profileone rounded-t-md' :
            'px-5 hover:text-navbarbuttonhighlight bg-graybutton rounded-t-md'}
        >
          Users
        </Link>
        {/* BANNED USERS */}
        {user_admin && localStorage.getItem('token') ? (
          <Link
            to={`/users/banned`}
            onClick={() => handleClearSearchBar()}
            className={url.includes('banned') && url.includes('users') ?
              'px-5 hover:text-navbarbuttonhighlight bg-profileone rounded-t-md' :
              'px-5 hover:text-navbarbuttonhighlight bg-graybutton rounded-t-md'}
          >
            Banned
          </Link>
        ) : null}
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
      <div className='p-4 rounded-b-md rounded-tr-md bg-profileone'>
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
            path={`/users/banned`}
            render={(props) => (
              <UserList
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                users={banned_users}
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