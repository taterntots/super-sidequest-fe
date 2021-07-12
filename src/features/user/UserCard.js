import React from 'react';

// IMAGES
import UserBannerPlaceholder from '../../img/UserBannerPlaceholder.jpg';

// ----------------------------------------------------------------------------------
// ------------------------------------ USER CARD -----------------------------------
// ----------------------------------------------------------------------------------

const UserCard = ({ data }) => {
  const {
    id,
    username,
    banner_pic_URL
  } = data;

  return (
    <div key={id} className={`p-2 rounded-lg transform transition duration-500 hover:scale-105`}>
      {/* TOP IMG */}
      <div className=''>
        <img
          className='w-full h-48 object-cover rounded-t-lg'
          src={banner_pic_URL ? banner_pic_URL : UserBannerPlaceholder}
          alt='img for a single user'
        />
      </div>
      {/* color bar */}
      <div className={`flex items-center justify-between px-4 py-2 text-sm text-white rounded-b-lg bg-gray-600`}>
        <span>{username}</span>
      </div>
    </div>
  );
};

export default UserCard;