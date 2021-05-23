import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchChallenges,
  challengeSelector
} from '../features/challenge/challengeSlice';

// COMPONENTS
import ChallengeList from '../features/challenge/ChallengeList.js';

// ----------------------------------------------------------------------------------
// ------------------------------------ HOMEPAGE ------------------------------------
// ----------------------------------------------------------------------------------

const HomePage = () => {
  const dispatch = useDispatch();
  const { challenges, loading, error } = useSelector(challengeSelector)

  useEffect(() => {
    dispatch(fetchChallenges())
  }, [dispatch])

  return (
    <>
      <div>
        <h1 className='text-white font-medium text-2xl border-b-2'>
          Featured Challenges
        </h1>
        <ChallengeList challenges={challenges} loading={loading} error={error} />
      </div>

      <div>
        <h1 className='text-white font-medium text-2xl border-b-2'>
          Popular Challenges
        </h1>
        <ChallengeList challenges={challenges} loading={loading} error={error} />
      </div>

      <div>
        <h1 className='text-white font-medium text-2xl border-b-2'>
          Latest Challenges
        </h1>
        <ChallengeList challenges={challenges} loading={loading} error={error} />
      </div>
    </>
  );
}

export default HomePage;