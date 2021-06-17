import React from 'react';

// ----------------------------------------------------------------------------------
// --------------------------------- CHALLENGE CARD ---------------------------------
// ----------------------------------------------------------------------------------

const ChallengeCard = ({ data }) => {
  const {
    challenge_id,
    name,
    description,
    username,
    game_title,
    banner_pic_URL,
    system,
    difficulty
  } = data;

  return (
    <div className='p-2 rounded-lg hover:bg-purple-500 transform transition duration-500 hover:scale-105'>
      <div
        key={challenge_id}
        className='md:flex'
      >
        <img
          className='md:h-24 md:w-44 rounded-md'
          src={banner_pic_URL}
          alt='banner for a single challenge'
        />
        <div className='md:flex md:justify-between text-center md:text-left w-full'>
          <div className='md:ml-4 self-center mt-4 md:mt-0'>
            <p>{name}</p>
            <p>{game_title}</p>
            <p>by {username}</p>
          </div>
          <div className='flex justify-evenly md:flex-col text-full mt-4 md:mt-0'>
            <p className='truncate px-2 border-2 rounded-md'>{system}</p>
            <p className='truncate px-2 border-2 rounded-md'>{difficulty}</p>
          </div>
        </div>
      </div>
      <div className='text-center'>
        <p className='mt-4 border-2 px-10 rounded-md bg-profiletwo'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default ChallengeCard;