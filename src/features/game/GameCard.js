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
    <div key={id} className={`hover:bg-cardhover max-w-359 hover:bg-opacity-25 p-2 rounded-md text-white`}>
      <div className={`overflow-hidden`}>
        {/* TOP IMG */}
        <img
          src={banner_pic_URL}
          alt='img for a challenge'
          className='object-fill w-full h-full min-h-full max-h-40 rounded-t-md'
        />
        {/* color bar */}
        <div className={`relative w-full`}>
          <div className={`flex items-center justify-between px-4 py-2 text-sm text-white rounded-b-lg bg-easy`}>
            <span>{name}</span>
            <span>{moment(release_date).format("YYYY")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;