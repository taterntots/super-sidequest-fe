import React from 'react';
import ChallengeList from '../features/challenge/ChallengeList.js';

// ----------------------------------------------------------------------------------
// ------------------------------------ HOMEPAGE ------------------------------------
// ----------------------------------------------------------------------------------

const HomePage = () => {
  return (
    <>
      <div>
        <h1 className='text-white font-medium text-2xl border-b-2'>
          Featured Challenges
        </h1>
        <ChallengeList />
      </div>

      <div>
        <h1 className='text-white font-medium text-2xl border-b-2'>
          Popular Challenges
        </h1>
        <ChallengeList />
      </div>

      <div>
        <h1 className='text-white font-medium text-2xl border-b-2'>
          Latest Challenges
        </h1>
        <ChallengeList />
      </div>
    </>
  );
}

export default HomePage;