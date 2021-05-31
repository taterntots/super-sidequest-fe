import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchChallengeById,
  fetchIfChallengeAlreadyAccepted,
  fetchAllChallengeHighScores,
  acceptChallenge,
  abandonChallenge,
  challengeSelector
} from '../challenge/challengeSlice';

// ROUTING
import { Link, useRouteMatch, useHistory } from 'react-router-dom';

// IMAGES
import { ReactComponent as LoadingSpinner } from '../../img/LoadingSpinner.svg';

// COMPONENTS
import AcceptChallengeModal from '../../components/utils/modals/AcceptChallengeModal';
import AbandonChallengeModal from '../../components/utils/modals/AbandonChallengeModal';
import Leaderboard from '../../components/Leaderboard';

// ----------------------------------------------------------------------------------
// ------------------------------- CHALLENGE DETAILS --------------------------------
// ----------------------------------------------------------------------------------

const ChallengeDetails = ({ refresh, setRefresh }) => {
  // State
  const dispatch = useDispatch();
  const { challenge, challenges_high_scores, challengeIsAccepted, loading: challengeLoading } = useSelector(challengeSelector)
  const route = useRouteMatch();
  const history = useHistory();
  const [openAccept, setOpenAccept] = useState(false)
  const [openAbandon, setOpenAbandon] = useState(false)
  const isChallengeAcceptedData = {
    user_id: localStorage.getItem('id'),
    challenge_id: route.params.challengeId
  }

  // Grabs all necessary data from server
  useEffect(() => {
    dispatch(fetchChallengeById(route.params.challengeId))
    dispatch(fetchAllChallengeHighScores(route.params.challengeId))
    dispatch(fetchIfChallengeAlreadyAccepted(isChallengeAcceptedData))
  }, [dispatch, refresh])

  // Function to handle submitting Login form
  const submitChallengeAccepted = async () => {
    dispatch(acceptChallenge(route.params.challengeId))
      .then(res => {
        if (res.payload) {
          setRefresh(!refresh)
          setOpenAccept(false);
          // history.push(`/${localStorage.getItem('username')}/accepted`)
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  // Function to handle submitting Login form
  const submitChallengeAbandoned = async () => {
    dispatch(abandonChallenge(route.params.challengeId))
      .then(res => {
        if (res.payload) {
          setRefresh(!refresh)
          setOpenAbandon(false);
          // history.push(`/${localStorage.getItem('username')}/accepted`)
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="mr-3 w-1/2 p-10 bg-taterpurple rounded-lg text-white">
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
        </div>

        {challenges_high_scores ? (
          <div className="w-1/2 p-10 bg-taterpurple rounded-lg text-white">
            <h1 className='mb-3'>
              LEADERBOARD
            </h1>
            {challenges_high_scores.map(highscore => (
              <Link
                key={highscore.id}
                to={`/${highscore.username}`}
              // onClick={handleClearSearchBar}
              >
                <Leaderboard
                  key={highscore.id}
                  data={highscore}
                />
              </Link>
            ))}
          </div>
        ) : null}
      </div >

      {/* CHALLENGE ACCEPTED/ABANDONED BUTTONS */}
      {!challengeIsAccepted && localStorage.getItem('token') ? (
        <button
          onClick={() => setOpenAccept(true)}
          className={`flex items-center rounded-lg text-lg px-24 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
        >
          {challengeLoading && (
            <LoadingSpinner />
          )}
          Accept
        </button>
      ) : challengeIsAccepted && localStorage.getItem('token') ? (
        <button
          onClick={() => setOpenAbandon(true)}
          className={`flex items-center rounded-lg text-lg px-24 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
        >
          {challengeLoading && (
            <LoadingSpinner />
          )}
          Abandon
        </button>
      ) : null}

      {/* Modal for accepting challenge */}
      <AcceptChallengeModal open={openAccept} setOpen={setOpenAccept} submitChallengeAccepted={submitChallengeAccepted} />
      <AbandonChallengeModal open={openAbandon} setOpen={setOpenAbandon} submitChallengeAbandoned={submitChallengeAbandoned} />
    </>
  );
}

export default ChallengeDetails;