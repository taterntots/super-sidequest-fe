import React from 'react';

// DATE
import moment from 'moment';

// ----------------------------------------------------------------------------------
// ------------------------------------ GAME CARD -----------------------------------
// ----------------------------------------------------------------------------------

const GameCard = ({ data }) => {
  const {
    id,
    name,
    release_date,
    banner_pic_URL
  } = data;

  return (
    <div key={id} className={`p-2 rounded-lg transform transition duration-500 hover:scale-105`}>
      {/* TOP IMG */}
      <div className=''>
        <img
          className='w-full h-48 object-cover rounded-t-lg'
          src={banner_pic_URL}
          alt='img for a single game'
        />
      </div>
      {/* color bar */}
      <div className={`flex items-center justify-between px-4 py-2 text-sm text-white rounded-b-lg bg-gray-600`}>
        <span>{name}</span>
        <span>{moment(release_date).format("YYYY")}</span>
      </div>
    </div>
  );
};

export default GameCard;