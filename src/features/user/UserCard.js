import React from 'react';

// IMAGES
import Tater from '../../img/Tater.png';
import Tots from '../../img/Tots.png';

// ----------------------------------------------------------------------------------
// ------------------------------------ USER CARD -----------------------------------
// ----------------------------------------------------------------------------------

const UserCard = ({ data }) => {
  const placeholderUserImages = [Tater, Tots]
  const {
    id,
    username,
    banner_pic_URL
  } = data;

  return (
    <div key={id} className={`p-2 rounded-lg transform transition duration-500 hover:scale-105`}>
      {/* TOP IMG */}
      <div className=''>
        {banner_pic_URL ? (
          <img
            className='w-full h-48 object-cover rounded-t-lg'
            src={banner_pic_URL}
            alt='img for a single user'
          />
        ) : (
          <img
            className='w-full h-48 object-contain bg-indigo-400 rounded-t-lg'
            src={placeholderUserImages[Math.floor(Math.random() * placeholderUserImages.length)]}
            alt='img for a single user'
          />
        )}
      </div>
      {/* color bar */}
      <div className={`flex items-center justify-between px-4 py-2 text-sm text-white rounded-b-lg bg-gray-600`}>
        <span>{username}</span>
      </div>
    </div>
  );
};

export default UserCard;