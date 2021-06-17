import React from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// ------------------------------ FEATURED CHALLENGE CARD ---------------------------
// ----------------------------------------------------------------------------------

const FeaturedChallengeCard = ({ data }) => {
  const {
    challenge_id,
    name,
    description,
    difficulty,
    username,
    game_title,
    banner_pic_URL,
    is_high_score,
    is_speedrun,
    prize,
    system
  } = data;

  return (
    <div className="px-10 mb-3 pb-4 bg-profileone rounded-lg text-white">
      <h1 className='text-center text-2xl font-medium pt-4 mt-4 lg:my-0'>
        {name}
      </h1>
      <h2 className='text-center text-lg font-medium pb-4 lg:my-0'>
        by {username}
      </h2>
      <Link to={`/${username}/challenges/${challenge_id}`}>
        <div className='transform transition duration-500 hover:scale-105'>
          <img
            className='rounded-t-md w-full'
            src={banner_pic_URL}
            alt='banner for a single game'
          />
          <p className='mb-4 text-center text-lg rounded-b-md bg-gray-700'>
            {game_title}
          </p>
        </div>
      </Link>
      <p className='mb-4 border-2 text-center rounded-md bg-profiletwo'>
        {description}
      </p>
      <div className='flex justify-evenly mb-4'>
        <p className='px-2 border-2 rounded-md'>
          {is_high_score ? 'High Score' :
            is_speedrun ? 'Speedrun' :
              'For Glory'}
        </p>
        <p className='px-2 border-2 rounded-md'>
          {system}
        </p>
        <p className='px-2 border-2 rounded-md'>
          {difficulty}
        </p>
      </div>
      {prize ? (
        <div className='text-center border-2 mx-10 mb-4 rounded-md bg-yellow-500'>
          <p className='text-xl'>Reward</p>
          <p>
            {prize}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default FeaturedChallengeCard;