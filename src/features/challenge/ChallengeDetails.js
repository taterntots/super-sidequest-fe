import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchChallengeById,
  fetchIfChallengeAlreadyAccepted,
  fetchAllChallengeHighScores,
  fetchAllChallengeSpeedruns,
  fetchAllChallengeForGlorys,
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
  const { challenge, challenges_high_scores, challenges_speedruns, challenges_for_glorys, acceptedChallenge, featured_challenge, loading: challengeLoading } = useSelector(challengeSelector)
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
    dispatch(fetchAllChallengeForGlorys(route.params.challengeId))

    if (localStorage.getItem('token')) {
      dispatch(fetchIfChallengeAlreadyAccepted(isChallengeAcceptedData))
      dispatch(fetchUserFeaturedChallenge(localStorage.getItem('id')))
    }
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
        setRefresh(!refresh)
        setOpenAccept(false);
      })
      .catch(err => {
        console.log(err)
      })
  };

  // Function to handle abandoning a challenge
  const submitChallengeAbandoned = async () => {
    dispatch(abandonChallenge(route.params.challengeId))
      .then(res => {
        setRefresh(!refresh)
        setOpenAbandon(false);
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
        setRefresh(!refresh)
        setOpenProgress(false);
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
        setRefresh(!refresh)
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
        setRefresh(!refresh)
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <>
      <div className="lg:flex justify-between">
        <div className="mr-3 w-full lg:w-2/5 h-full px-10 pb-4 bg-profileone rounded-lg text-white">
          <h1 className='text-center text-2xl font-medium pt-4 lg:my-0'>
            {challenge.name}
          </h1>
          <h2 className='text-center text-lg font-medium pb-4 lg:my-0'>
            by {challenge.username}
          </h2>
          <div>
            <img
              className='rounded-t-md w-full'
              src={challenge.banner_pic_URL}
              alt='banner for a single game'
            />
            <p className='mb-4 text-center text-lg rounded-b-md bg-gray-700'>
              {challenge.game_title}
            </p>
          </div>
          <p className='mb-4 border-2 text-center rounded-md bg-profiletwo'>
            {challenge.description}
          </p>
          <div className='flex justify-evenly mb-4'>
            <p className='px-2 border-2 rounded-md'>
              {challenge.is_high_score ? 'High Score' :
                challenge.is_speedrun ? 'Speedrun' :
                  'For Glory'}
            </p>
            <p className='px-2 border-2 rounded-md'>
              {challenge.system}
            </p>
            <p className='px-2 border-2 rounded-md'>
              {challenge.difficulty}
            </p>
          </div>
          <p className='whitespace-pre-wrap mb-4'>
            {challenge.rules}
          </p>
          {challenge.prize ? (
            <div className='text-center border-2 mx-10 mb-4 rounded-md bg-yellow-500'>
              <p className='text-xl'>Reward</p>
              <p>
                {challenge.prize}
              </p>
            </div>
          ) : null}

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
        <Leaderboard challenges_scores={challenges_high_scores ? challenges_high_scores : challenges_speedruns ? challenges_speedruns : challenges_for_glorys} challenge={challenge} setOpen={setOpenProgress} acceptedChallenge={acceptedChallenge} submitChallengeCompleted={submitChallengeCompleted} />
      </div >

      {/* Modals */}
      <AcceptChallengeModal open={openAccept} setOpen={setOpenAccept} submitChallengeAccepted={submitChallengeAccepted} />
      <AbandonChallengeModal open={openAbandon} setOpen={setOpenAbandon} submitChallengeAbandoned={submitChallengeAbandoned} />
      <SubmitChallengeProgressModal open={openProgress} setOpen={setOpenProgress} submitChallengeProgress={submitChallengeProgress} loading={challengeLoading} acceptedChallenge={acceptedChallenge} challenge={challenge} />
    </>
  );
}

export default ChallengeDetails;