import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchChallengeById,
  fetchIfChallengeAlreadyAccepted,
  fetchAllChallengeHighScores,
  fetchAllChallengeSpeedruns,
  acceptChallenge,
  abandonChallenge,
  updateUserChallengeProgress,
  challengeSelector
} from '../challenge/challengeSlice';

// ROUTING
import { useRouteMatch } from 'react-router-dom';

// COMPONENTS
import AcceptChallengeModal from '../../components/utils/modals/AcceptChallengeModal';
import AbandonChallengeModal from '../../components/utils/modals/AbandonChallengeModal';
import SubmitChallengeProgressModal from '../../components/utils/modals/SubmitChallengeProgressModal.js';
import Leaderboard from '../../components/Leaderboard';

// ----------------------------------------------------------------------------------
// ------------------------------- CHALLENGE DETAILS --------------------------------
// ----------------------------------------------------------------------------------

const ChallengeDetails = ({ refresh, setRefresh }) => {
  // State
  const dispatch = useDispatch();
  const { challenge, challenges_high_scores, challenges_speedruns, acceptedChallenge, loading: challengeLoading } = useSelector(challengeSelector)
  const route = useRouteMatch();
  const [openAccept, setOpenAccept] = useState(false)
  const [openAbandon, setOpenAbandon] = useState(false)
  const [openProgress, setOpenProgress] = useState(false)
  const isChallengeAcceptedData = {
    user_id: localStorage.getItem('id'),
    challenge_id: route.params.challengeId
  }

  // Grabs all necessary data from server
  useEffect(() => {
    dispatch(fetchChallengeById(route.params.challengeId))
    dispatch(fetchAllChallengeHighScores(route.params.challengeId))
    dispatch(fetchAllChallengeSpeedruns(route.params.challengeId))
    dispatch(fetchIfChallengeAlreadyAccepted(isChallengeAcceptedData))
  }, [dispatch, refresh])

  // Function to handle accepting a challenged
  const submitChallengeAccepted = async () => {
    dispatch(acceptChallenge(route.params.challengeId))
      .then(res => {
        if (res.payload) {
          setRefresh(!refresh)
          setOpenAccept(false);
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  // Function to handle abandoning a challenge
  const submitChallengeAbandoned = async () => {
    dispatch(abandonChallenge(route.params.challengeId))
      .then(res => {
        if (res.payload) {
          setRefresh(!refresh)
          setOpenAbandon(false);
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  // Function to handle submitting challenge progress
  const submitChallengeProgress = async (data) => {
    data.challenge_id = route.params.challengeId

    dispatch(updateUserChallengeProgress(data))
      .then(res => {
        if (res.payload) {
          setRefresh(!refresh)
          setOpenProgress(false);
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="mr-3 w-2/5 h-full p-10 bg-taterpurple rounded-lg text-white">
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
          {/* CHALLENGE ACCEPTED/ABANDONED BUTTONS */}
          {!acceptedChallenge && localStorage.getItem('token') ? (
            <button
              onClick={() => setOpenAccept(true)}
              className={`flex items-center rounded-lg text-lg px-24 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
            >
              Accept
            </button>
          ) : acceptedChallenge && localStorage.getItem('token') ? (
            <button
              onClick={() => setOpenAbandon(true)}
              className={`flex mr-4 items-center rounded-lg text-lg px-24 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
            >
              Abandon
            </button>
          ) : null}
        </div>

        {/* LEADERBOARD */}
        <Leaderboard challenges_scores={challenges_high_scores ? challenges_high_scores : challenges_speedruns} challenge={challenge} setOpen={setOpenProgress} acceptedChallenge={acceptedChallenge} />
      </div >

      {/* Modals */}
      <AcceptChallengeModal open={openAccept} setOpen={setOpenAccept} submitChallengeAccepted={submitChallengeAccepted} />
      <AbandonChallengeModal open={openAbandon} setOpen={setOpenAbandon} submitChallengeAbandoned={submitChallengeAbandoned} />
      <SubmitChallengeProgressModal open={openProgress} setOpen={setOpenProgress} submitChallengeProgress={submitChallengeProgress} loading={challengeLoading} acceptedChallenge={acceptedChallenge} challenge={challenge} />
    </>
  );
}

export default ChallengeDetails;