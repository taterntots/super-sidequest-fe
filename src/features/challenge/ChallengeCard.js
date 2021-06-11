import React from 'react';

// IMAGES
// import { ReactComponent as BlankPublisher } from '../../img/icon/BlankPublisher.svg';

// ----------------------------------------------------------------------------------
// --------------------------------- CHALLENGE CARD 2 -------------------------------
// ----------------------------------------------------------------------------------

const ChallengeCard2 = ({ data }) => {
  const {
    challenge_id,
    name,
    description,
    username,
    game_title,
    banner_pic_URL,
    system,
    difficulty,
    points
  } = data;

  return (
    <div className='p-2 rounded-lg hover:bg-purple-500 transform transition duration-500 hover:scale-105'>
      <div
        key={challenge_id}
        className='flex'
      >
        <img
          className='h-24 w-44 rounded-md'
          src={banner_pic_URL}
          alt='banner for a single challenge'
        />
        <div className='flex justify-between w-full'>
          <div className='ml-4 self-center'>
            <p>{name}</p>
            <p>{game_title}</p>
            <p>by {username}</p>

          </div>
          <div className='text-full'>
            <p className='truncate px-2 border-2 rounded-md'>{system}</p>
          </div>
        </div>
      </div>
      <div className='text-center'>
        <p className='mt-2 border-2 px-10 rounded-md bg-profiletwo'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default ChallengeCard2;