import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchFindIfUserBannedByUsername
} from '../../features/user/userSlice';

// IMAGES
import Derp from '../../img/Derp.png'

// ----------------------------------------------------------------------------------
// ------------------------------ BANNED USER PAGE ----------------------------------
// ----------------------------------------------------------------------------------

const BannedUserPage = () => {
  // State
  const dispatch = useDispatch();

  // Finds out if the logged in user is banned and forces them to sign out immediately upon navigating to their profile page
  useEffect(() => {
    if (localStorage.getItem('username')) {
      dispatch(fetchFindIfUserBannedByUsername(localStorage.getItem('username')))
        .then(res => {
          if (res.payload === true) {
            localStorage.clear()
          }
        })
    }
  }, [])

  return (
    <div className='text-center text-white'>
      <img
        className='h-1/5 w-1/5 mr-auto ml-auto'
        src={Derp}
        alt='banner for a user'
      />
      <p className='text-lg font-bold leading-6 mt-4'>
        The Ban Hammer has been dropped on this account.
      </p>
      <p className='text-lg font-bold leading-6 mt-4'>
        All your quests are belong to us!
      </p>
    </div>
  );
}

export default BannedUserPage;