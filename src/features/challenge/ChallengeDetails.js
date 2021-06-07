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

  console.log('CHALLENGE', challenge)
  console.log('FEATURED', featured_challenge)

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

          {/* FEATURED TOGGLE */}
          {challenge.user_id === localStorage.getItem('id') ? (
            <span
              onClick={() => {
                setFeaturedOn(!featuredOn);
                if (featuredOn) {
                  submitChallengeFeatured({ featured: false })
                }
                if (!featuredOn) {
                  submitChallengeFeatured({ featured: true })
                }
              }}
              role='checkbox'
              tabIndex='0'
              aria-checked='false'
              className={`${featuredOn ? 'bg-purplebutton' : 'bg-gray-300'
                } relative mx-3 inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}
            >
              {/* <!-- On: "translate-x-5", Off: "translate-x-0" --> */}
              <span
                aria-hidden='true'
                className={`${featuredOn ? 'translate-x-5' : 'translate-x-0'
                  } translate-x-0 relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
              >
                {/* <!-- On: "opacity-0 ease-out duration-100", Off: "opacity-100 ease-in duration-200" --> */}
                <span
                  className={`${featuredOn
                    ? 'opacity-0 ease-out duration-100'
                    : 'opacity-100 ease-in duration-200'
                    } opacity-100 ease-in duration-200 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                ></span>
                {/* <!-- On: "opacity-100 ease-in duration-200", Off: "opacity-0 ease-out duration-100" --> */}
                <span
                  className={`${featuredOn
                    ? 'opacity-100 ease-in duration-200'
                    : 'opacity-0 ease-out duration-100'
                    } opacity-0 ease-out duration-100 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                >
                  <svg
                    className='w-3 h-3 text-indigo-600'
                    fill='currentColor'
                    viewBox='0 0 12 12'
                  >
                    <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                  </svg>
                </span>
              </span>
            </span>
          ) : null}
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