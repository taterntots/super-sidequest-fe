import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchChallengeById,
  fetchIfChallengeAlreadyAccepted,
  fetchAllChallengeHighScores,
  fetchAllChallengeSpeedruns,
  fetchUserFeaturedChallenge,
  acceptChallenge,
  abandonChallenge,
  updateUserChallengeProgress,
  updateUserChallengeCompletion,
  updateUserChallengeFeatured,
  challengeSelector
} from '../challenge/challengeSlice';

// ROUTING
import { useRouteMatch } from 'react-router-dom';

// COMPONENTS
import AcceptChallengeModal from '../../components/utils/modals/AcceptChallengeModal';
import AbandonChallengeModal from '../../components/utils/modals/AbandonChallengeModal';
import SubmitChallengeProgressModal from '../../components/utils/modals/SubmitChallengeProgressModal.js';
import Leaderboard from '../../components/Leaderboard';
import Toggle from '../../components/utils/buttons/Toggle';

// ----------------------------------------------------------------------------------
// ------------------------------- CHALLENGE DETAILS --------------------------------
// ----------------------------------------------------------------------------------

const ChallengeDetails = ({ refresh, setRefresh }) => {
  // State
  const dispatch = useDispatch();
  const { challenge, challenges_high_scores, challenges_speedruns, acceptedChallenge, featured_challenge, loading: challengeLoading } = useSelector(challengeSelector)
  const route = useRouteMatch();
  const [openAccept, setOpenAccept] = useState(false)
  const [openAbandon, setOpenAbandon] = useState(false)
  const [openProgress, setOpenProgress] = useState(false)
  const [featuredOn, setFeaturedOn] = useState()
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
    dispatch(fetchUserFeaturedChallenge(localStorage.getItem('id')))
  }, [dispatch, refresh])

  // UseEffect that sets the toggle correctly on refresh based on whether a challenge is featured or not
  useEffect(() => {
    if (challenge.challenge_id === featured_challenge.challenge_id) {
      setFeaturedOn(true)
    } else {
      setFeaturedOn(false)
    }
  }, [challenge.featured, featured_challenge.featured])

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
    if (data.speedrun_hours && data.speedrun_minutes && data.speedrun_seconds && data.speedrun_milliseconds) {
      let hour_millis = data.speedrun_hours * 3.6e6
      let minute_millis = data.speedrun_minutes * 60000
      let second_millis = data.speedrun_seconds * 1000
      let milliseconds = data.speedrun_milliseconds * 1
      data.total_milliseconds = hour_millis + minute_millis + second_millis + milliseconds
    }
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

  // Function to handle completing a challenge
  const submitChallengeCompleted = async (data) => {
    data.challenge_id = route.params.challengeId

    dispatch(updateUserChallengeCompletion(data))
      .then(res => {
        if (res.payload) {
          setRefresh(!refresh)
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  // Function to handle marking a challenge as featured
  const submitChallengeFeatured = async (data) => {
    data.challenge_id = route.params.challengeId

    dispatch(updateUserChallengeFeatured(data))
      .then(res => {
        if (res.payload) {
          setRefresh(!refresh)
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <>
      <div className="lg:flex justify-between">
        <div className="mr-3 w-full lg:w-2/5 h-full px-10 pb-4 bg-profileone rounded-lg text-white">
          <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
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
          <div className='flex flex-col md:flex-row justify-evenly'>
            {!acceptedChallenge && localStorage.getItem('token') ? (
              <button
                onClick={() => setOpenAccept(true)}
                className={`rounded-lg text-lg px-12 py-3 mb-4 md:mb-0 font-medium bg-profiletwo hover:bg-white hover:text-profiletwo focus:ring transition duration-150 ease-in-out`}
              >
                Accept
              </button>
            ) : acceptedChallenge && localStorage.getItem('token') ? (
              <button
                onClick={() => setOpenAbandon(true)}
                className={`rounded-lg text-lg px-12 py-3 mb-4 md:mb-0 font-medium bg-profiletwo hover:bg-white hover:text-profiletwo focus:ring transition duration-150 ease-in-out`}
              >
                Abandon
              </button>
            ) : null}

            {/* FEATURED TOGGLE */}
            {challenge.user_id === localStorage.getItem('id') ? (
              <div className='flex self-center'>
                <p className='font-bold'>Featured:</p>
                <Toggle on={featuredOn} setOn={setFeaturedOn} submitFunction={submitChallengeFeatured} />
              </div>
            ) : null}
          </div>
        </div>

        {/* LEADERBOARD */}
        <Leaderboard challenges_scores={challenges_high_scores ? challenges_high_scores : challenges_speedruns} challenge={challenge} setOpen={setOpenProgress} acceptedChallenge={acceptedChallenge} submitChallengeCompleted={submitChallengeCompleted} />
      </div >

      {/* Modals */}
      <AcceptChallengeModal open={openAccept} setOpen={setOpenAccept} submitChallengeAccepted={submitChallengeAccepted} />
      <AbandonChallengeModal open={openAbandon} setOpen={setOpenAbandon} submitChallengeAbandoned={submitChallengeAbandoned} />
      <SubmitChallengeProgressModal open={openProgress} setOpen={setOpenProgress} submitChallengeProgress={submitChallengeProgress} loading={challengeLoading} acceptedChallenge={acceptedChallenge} challenge={challenge} />
    </>
  );
}

export default ChallengeDetails;