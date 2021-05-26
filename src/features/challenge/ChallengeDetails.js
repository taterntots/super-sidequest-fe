import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchChallengeById,
  challengeSelector
} from '../challenge/challengeSlice';

// ROUTING
import { useRouteMatch } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// ------------------------------- CHALLENGE DETAILS --------------------------------
// ----------------------------------------------------------------------------------

const ChallengeDetails = () => {
  // State
  const dispatch = useDispatch();
  const { challenge, loading: challengeLoading, error: challengeError } = useSelector(challengeSelector)
  const route = useRouteMatch();

  // Grabs all necessary data from server
  useEffect(() => {
    dispatch(fetchChallengeById(route.params.challengeId))
  }, [dispatch])

  console.log(challenge)

  return (
    <>
      <div className="p-10 bg-taterpurple rounded-lg text-white">
        <h1>
          {challenge.name}
        </h1>
        <br />

        {challenge.is_high_score ? (
          <p>Highscore</p>
        ) : challenge.is_speedrun ? (
          <p>Speedrun</p>
        ) : (
          <p>For Glory</p>
        )}
        <br />

        <p className='whitespace-pre-wrap border-2'>
          {challenge.rules}
        </p>
        <br />

        <button
          to={`/${localStorage.getItem('username')}/add-challenge`}
          className={`flex items-center rounded-lg text-lg px-24 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
        >
          Accept
        </button>
      </div >
    </>
  );
}

export default ChallengeDetails;