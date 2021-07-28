import React from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// FUNCTIONS
import { levelUp } from './utils/Functions';

// COMPONENTS
import ChallengeCard from '../features/challenge/ChallengeCard';
import FeaturedChallengeCard from '../features/challenge/FeaturedChallengeCard';

// ----------------------------------------------------------------------------------
// --------------------------------- PROFILE PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const ProfilePage = ({ acceptedChallenges, challenge_game_stats, featured_challenge, ProfileOne, ProfileTwo, user }) => {
  return (
    <ProfileOne className='p-4 rounded-tr-md bg-profileone rounded-b-md'>
      <div className='lg:flex justify-between'>

        {/* STATS */}
        <ProfileTwo className='mr-3 w-full lg:w-2/5 h-full pb-4 px-4 sm:px-10 bg-profiletwo rounded-lg text-white'>
          <h1 className='text-center text-2xl font-medium py-4'>
            Stats
          </h1>
          {challenge_game_stats.length === 0 ? (
            <div className='text-center text-white'>
              <p className='text-lg leading-6'>
                There are no completed quests
              </p>
            </div>
          ) : (
            // STATS BOARD
            <div className='rounded-lg bg-gray-700'>
              <div className='flex justify-between px-4 py-1 font-bold'>
                <p>
                  Game
                </p>
                <p>
                  Level
                </p>
              </div>
              {challenge_game_stats.map((gameStat, index) => (
                <Link
                  key={gameStat.game}
                  to={`${user.username}/challenges?game=${gameStat.game}`}
                  className={`flex justify-between font-medium ${index % 2 ? 'bg-gray-600' : 'bg-gray-500'} px-4 py-1 hover:opacity-90`}
                >
                  <p>{gameStat.game}</p>
                  <p className='pl-4'>{levelUp(gameStat.total_points).level}</p>
                </Link>
              ))}
              {/* ADDS BOTTOM LAYER */}
              <p className='invisible'>
                BOTTOM
              </p>
            </div>

          )}
        </ProfileTwo>

        <div className='w-full lg:w-3/5'>
          {/* FEATURED CHALLENGE */}
          {featured_challenge.challenge_id ? (
            <FeaturedChallengeCard data={featured_challenge} />
          ) : null}

          {/* ACCEPTED CHALLENGES */}
          <ProfileTwo className='px-4 sm:px-10 pb-4 bg-profiletwo rounded-lg text-white'>
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Accepted Quests
            </h1>

            {acceptedChallenges.length === 0 ? (
              <div className='text-center text-white'>
                <p className='text-lg leading-6'>
                  There are no accepted quests
                </p>
              </div>
            ) : (
              <div className='grid gap-6 grig-cols-1'>
                {acceptedChallenges.map(acceptedChallenge => (
                  <Link
                    key={acceptedChallenge.challenge_id}
                    to={`/${acceptedChallenge.username}/challenges/${acceptedChallenge.challenge_id}`}
                  >
                    <ChallengeCard
                      key={acceptedChallenge.challenge_id}
                      data={acceptedChallenge}
                      user={user}
                    />
                  </Link>
                ))}
              </div>
            )}
          </ProfileTwo>
        </div>
      </div>
    </ProfileOne >
  );
}

export default ProfilePage;