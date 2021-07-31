import React, { useState } from 'react';

// STYLING
import styled from '@emotion/styled';

// COMPONENTS
import UserList from '../features/user/UserList';

// ----------------------------------------------------------------------------------
// --------------------------------- FOLLOWER PAGE ----------------------------------
// ----------------------------------------------------------------------------------

const FollowerPage = ({ user, user_followings, user_followers, searchTerm, handleClearSearchBar, ProfileTwo }) => {
  const [currentFollowFilter, setCurrentFollowFilter] = useState('Following')

  const ProfileOneFollowingButton = styled.button`
    background-color: ${currentFollowFilter === 'Following' ? user.profile_color_one : null};
  `
  const ProfileOneFollowerButton = styled.button`
    background-color: ${currentFollowFilter === 'Followers' ? user.profile_color_one : null};
  `
  return (
    <div
      className='p-4 rounded-tr-md bg-profileone rounded-b-md'
      style={{ backgroundColor: user.profile_color_one ? user.profile_color_one : null }}
    >
      <div className='flex flex-col-reverse lg:flex-row lg:justify-between'>
        {/* FRIEND LIST */}
        <ProfileTwo className='mr-3 w-full lg:w-4/5 h-full pb-4 px-4 sm:px-10 bg-profiletwo rounded-lg text-white'>
          <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
            {currentFollowFilter === 'Following' ? 'Following' :
              currentFollowFilter === 'Followers' ? 'Followers' :
                null
            }
          </h1>
          {currentFollowFilter === 'Following' && user_followings.length === 0 ? (
            <div className='text-center text-white'>
              <p className='text-lg leading-6'>
                {`${user.username} is not following any players`}
              </p>
            </div>
          ) : currentFollowFilter === 'Followers' && user_followers.length === 0 ? (
            <div className='text-center text-white'>
              <p className='text-lg leading-6'>
                {`${user.username} is not being followed by any players`}
              </p>
            </div>
          ) : (
            <UserList
              searchTerm={searchTerm}
              handleClearSearchBar={handleClearSearchBar}
              users={
                currentFollowFilter === 'Following' ? user_followings :
                  currentFollowFilter === 'Followers' ? user_followers :
                    null}
            />
          )}
        </ProfileTwo>

        {/* FRIEND TYPE */}
        <div className='w-full lg:w-1/5'>
          <ProfileTwo className='px-4 sm:px-10 mb-3 pb-4 bg-profiletwo rounded-lg text-white'>
            <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
              Friend Type
            </h1>
            <div className='flex flex-col'>
              <ProfileOneFollowingButton
                className={currentFollowFilter === 'Following' ?
                  'items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profileone focus:outline-none transition duration-150 ease-in-out' :
                  'items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:outline-none transition duration-150 ease-in-out'}
                onClick={() => {
                  setCurrentFollowFilter('Following')
                  handleClearSearchBar()
                }}
              >
                Following
              </ProfileOneFollowingButton>
              <ProfileOneFollowerButton
                className={currentFollowFilter === 'Followers' ?
                  'items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profileone focus:outline-none transition duration-150 ease-in-out' :
                  'items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:outline-none transition duration-150 ease-in-out'}
                onClick={() => {
                  setCurrentFollowFilter('Followers')
                  handleClearSearchBar()
                }}
              >
                Followers
              </ProfileOneFollowerButton>
            </div>
          </ProfileTwo>
        </div>
      </div >
    </div>
  );
}

export default FollowerPage;