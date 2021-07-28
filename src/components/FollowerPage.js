import React from 'react';

// COMPONENTS
import UserList from '../features/user/UserList';

// ----------------------------------------------------------------------------------
// --------------------------------- FOLLOWER PAGE ----------------------------------
// ----------------------------------------------------------------------------------

const FollowerPage = ({ user, user_followers, searchTerm, handleClearSearchBar, ProfileTwo }) => {
  return (
    <div
      className='p-4 rounded-tr-md bg-profileone rounded-b-md'
      style={{ backgroundColor: user.profile_color_one ? user.profile_color_one : null }}
    >
      <div className='flex flex-col-reverse lg:flex-row lg:justify-between'>
        {/* CHALLENGE LIST */}
        <ProfileTwo className='mr-3 w-full h-full pb-4 px-4 sm:px-10 bg-profiletwo rounded-lg text-white'>
          <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
            Following
          </h1>
          {user_followers.length === 0 ? (
            <div className='text-center text-white'>
              <p className='text-lg leading-6'>
                There are no players being followed
              </p>
            </div>
          ) : (
            <UserList
              searchTerm={searchTerm}
              handleClearSearchBar={handleClearSearchBar}
              users={user_followers}
            />
          )}
        </ProfileTwo>
      </div >
    </div>
  );
}

export default FollowerPage;