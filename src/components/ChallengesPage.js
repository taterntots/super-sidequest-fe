import React, { useState } from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// COMPONENTS
import ChallengeList from '../features/challenge/ChallengeList';

// ----------------------------------------------------------------------------------
// --------------------------------- PROFILE PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const ChallengesPage = ({ accepted_challenges, created_challenges, loading, searchTerm, handleClearSearchBar }) => {
  const [currentChallengeFilter, setCurrentChallengeFilter] = useState('Created')

  return (
    <>
      <div className="lg:flex justify-between">

        {/* CHALLENGE LIST */}
        <div className="mr-3 w-full lg:w-4/5 h-full pb-4 px-10 bg-profileone rounded-lg text-white">
          <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
            Challenges
          </h1>
          <ChallengeList
            challenges={
              currentChallengeFilter === 'Created' ? created_challenges :
                currentChallengeFilter === 'Active' ? accepted_challenges :
                  currentChallengeFilter === 'Completed' ? accepted_challenges :
                    null
            }
            loading={loading}
            searchTerm={searchTerm}
            handleClearSearchBar={handleClearSearchBar}
          />
        </div>

        <div className='w-full lg:w-1/5'>
          {/* FILTER */}
          <div className="px-10 mb-3 pb-4 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Filter By
            </h1>
            <div className='flex flex-col'>
              <button
                onClick={() => setCurrentChallengeFilter('Created')}
              >
                Created
              </button>
              <button
                onClick={() => setCurrentChallengeFilter('Active')}
              >
                Active
              </button>
              <button
                onClick={() => setCurrentChallengeFilter('Completed')}
              >
                Completed
              </button>
            </div>
          </div>

          {/* ACTIVE CHALLENGES */}
          <div className="px-10 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Search
            </h1>
            {/* {acceptedChallenges.map(acceptedChallenge => (
              <Link
                key={acceptedChallenge.challenge_id}
                to={`/${acceptedChallenge.username}/challenges/${acceptedChallenge.challenge_id}`}
                className='flex p-2 mb-3 rounded-lg hover:bg-purple-500'
              >
                <img
                  className='h-24 w-44 rounded-md'
                  src={acceptedChallenge.banner_pic_URL}
                  alt='banner for a single game'
                />
                <div className='flex justify-between w-full'>
                  <div className='ml-4 self-center'>
                    <div className='flex justify-between'>
                      <p>{acceptedChallenge.name}</p>
                    </div>
                    <p>by {acceptedChallenge.username}</p>
                    <p>{acceptedChallenge.description}</p>
                  </div>
                  <div className='ml-4'>
                    <p className='px-2 border-2 rounded-md'>{acceptedChallenge.system}</p>
                  </div>
                </div>
              </Link>
            ))} */}
            {/* FIXES WEIRD MARGIN ISSUE WHEN IN MOBILE VIEW */}
            <div className='invisible pt-1' />
          </div>
        </div>
      </div >
    </>
  );
}

export default ChallengesPage;