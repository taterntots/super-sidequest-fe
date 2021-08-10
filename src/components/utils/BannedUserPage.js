import React from 'react';

// IMAGES
import Derp from '../../img/Derp.png'

// ----------------------------------------------------------------------------------
// ------------------------------ BANNED USER PAGE ----------------------------------
// ----------------------------------------------------------------------------------

const BannedUserPage = () => {
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