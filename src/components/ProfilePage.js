import React from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// COMPONENTS
import ChallengeCard from '../features/challenge/ChallengeCard';

// ----------------------------------------------------------------------------------
// --------------------------------- PROFILE PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const ProfilePage = ({ acceptedChallenges, challenge_game_stats, featured_challenge }) => {
  return (
    <>
      <div className="lg:flex justify-between">

        {/* STATS */}
        <div className="mr-3 w-full lg:w-2/5 h-full pb-4 px-10 bg-profileone rounded-lg text-white">
          <h1 className='text-center text-2xl font-medium py-4'>
            Stats
          </h1>
          <div className='rounded-lg bg-gray-700'>
            <div className='flex justify-between px-4 py-1 font-bold'>
              <p>
                Game
              </p>
              <p>
                Quests Completed
              </p>
            </div>
            {challenge_game_stats.map((gameStat, index) => (
              <Link
                key={gameStat.game}
                to={`/games/${gameStat.game_id}/challenges`}
                className={`flex justify-between ${index % 2 ? 'bg-gray-600' : 'bg-gray-500'} px-4 py-1 hover:bg-white hover:text-profiletwo`}
              >
                <p>{gameStat.game}</p>
                <p className='pl-4'>{gameStat.total_challenges_completed}</p>
              </Link>
            ))}
            <p className='invisible'>
              INVISIBLE TEXT TO SHOW ROUNDED BORDER
            </p>
          </div>
        </div>

        <div className='w-full lg:w-3/5'>
          {/* FEATURED CHALLENGE */}
          {featured_challenge.challenge_id ? (
            <div className="px-10 mb-3 pb-4 bg-profileone rounded-lg text-white">
              <h1 className='text-center text-2xl font-medium pt-4 mt-4 lg:my-0'>
                {featured_challenge.name}
              </h1>
              <h2 className='text-center text-lg font-medium pb-4 lg:my-0'>
                by {featured_challenge.username}
              </h2>
              <Link to={`/${featured_challenge.username}/challenges/${featured_challenge.challenge_id}`}>
                <div className='transform transition duration-500 hover:scale-105'>
                  <img
                    className='rounded-t-md w-full'
                    src={featured_challenge.banner_pic_URL}
                    alt='banner for a single game'
                  />
                  <p className='mb-4 text-center text-lg rounded-b-md bg-gray-700'>
                    {featured_challenge.game_title}
                  </p>
                </div>
              </Link>
              <p className='mb-4 border-2 text-center rounded-md bg-profiletwo'>
                {featured_challenge.description}
              </p>
              <div className='flex justify-evenly mb-4'>
                <p className='px-2 border-2 rounded-md'>
                  {featured_challenge.is_high_score ? 'High Score' :
                    featured_challenge.is_speedrun ? 'Speedrun' :
                      'For Glory'}
                </p>
                <p className='px-2 border-2 rounded-md'>
                  {featured_challenge.system}
                </p>
                <p className='px-2 border-2 rounded-md'>
                  {featured_challenge.difficulty}
                </p>
              </div>
              {featured_challenge.prize ? (
                <div className='text-center border-2 mx-10 mb-4 rounded-md bg-yellow-500'>
                  <p className='text-xl'>Reward</p>
                  <p>
                    {featured_challenge.prize}
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* ACTIVE CHALLENGES */}
          <div className="px-10 pb-4 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Active Quests
            </h1>
            <div className='grid gap-6 grig-cols-1'>
              {acceptedChallenges.map(acceptedChallenge => (
                <Link
                  key={acceptedChallenge.challenge_id}
                  to={`/${acceptedChallenge.username}/challenges/${acceptedChallenge.challenge_id}`}
                >
                  <ChallengeCard
                    key={acceptedChallenge.challenge_id}
                    data={acceptedChallenge}
                  />
                </Link>
              ))}
            </div>
            {/* FIXES WEIRD MARGIN ISSUE WHEN IN MOBILE VIEW */}
            {/* <div className='invisible pt-1' /> */}
          </div>
        </div>
      </div >
    </>
  );
}

export default ProfilePage;