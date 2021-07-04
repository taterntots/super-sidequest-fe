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
  editChallenge,
  deleteChallenge,
  challengeSelector
} from '../challenge/challengeSlice';

// ROUTING
import { useRouteMatch, useHistory } from 'react-router-dom';

// STYLING
import styled from '@emotion/styled';

// DATE
import moment from 'moment';

// COMPONENTS
import AcceptChallengeModal from '../../components/utils/modals/AcceptChallengeModal';
import AbandonChallengeModal from '../../components/utils/modals/AbandonChallengeModal';
import SubmitChallengeProgressModal from '../../components/utils/modals/SubmitChallengeProgressModal';
import EditChallengeModal from '../../components/utils/modals/EditChallengeModal';
import DeleteChallengeModal from '../../components/utils/modals/DeleteChallengeModal';
import Leaderboard from '../../components/Leaderboard';

// ----------------------------------------------------------------------------------
// ------------------------------- CHALLENGE DETAILS --------------------------------
// ----------------------------------------------------------------------------------

const ChallengeDetails = ({ refresh, setRefresh, ProfileOne, ProfileTwo }) => {
  // State
  const dispatch = useDispatch();
  const { challenge, challenges_high_scores, challenges_speedruns, challenges_for_glorys, acceptedChallenge, loading: challengeLoading } = useSelector(challengeSelector)
  const route = useRouteMatch();
  const history = useHistory();
  const [openAccept, setOpenAccept] = useState(false)
  const [openAbandon, setOpenAbandon] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openProgress, setOpenProgress] = useState(false)
  const [featuredOn, setFeaturedOn] = useState()
  const [countdownIsAfter, setCountdownIsAfter] = useState(true);
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
    if (challenge.featured) {
      setFeaturedOn(true)
    } else {
      setFeaturedOn(false)
    }
  }, [challenge, refresh])

  // UseEffect that sets whether a challenge has expired or not
  useEffect(() => {
    if (moment(challenge.end_date).isAfter()) {
      setCountdownIsAfter(true)
    } else {
      setCountdownIsAfter(false)
    }
  }, [challenge.end_date, refresh])

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

  // Function to handle submitting edited challenge data
  const submitChallengeEdit = async (data) => {
    data.challenge_id = route.params.challengeId
    // If difficulty is unchanged, keep it that way (React Select won't let me do this directly in defaultValue)
    if (!data.difficulty) {
      data.difficulty = { label: `${challenge.difficulty_id}`, value: `${challenge.difficulty_id}` }
    }

    dispatch(editChallenge(data))
      .then(res => {
        setRefresh(!refresh)
        setOpenEdit(false);
      })
      .catch(err => {
        console.log(err)
      })
  };

  // Function to handle deleting a challenge
  const submitChallengeDelete = async () => {
    dispatch(deleteChallenge(route.params.challengeId))
      .then(res => {
        setRefresh(!refresh)
        setOpenDelete(false);
        history.push(`/${route.params.username}/challenges`)
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

  const ProfileOnePara = styled.p`
    background-color: ${challenge.profile_color_one ? challenge.profile_color_one : null};
  `
  const ProfileOneButton = styled.button`
    background-color: ${challenge.profile_color_one ? challenge.profile_color_one : null};
    $:hover {
      color: ${challenge.profile_color_one ? challenge.profile_color_one : null};
    }
  `

  return (
    <>
      <ProfileOne className='p-4 rounded-tr-md bg-profileone rounded-b-md'>
        <div className="lg:flex justify-between">
          <ProfileTwo className="mr-3 w-full lg:w-2/5 h-full px-10 pb-4 bg-profiletwo rounded-lg text-white">
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
              <p className='mb-4 p-1 text-center text-lg rounded-b-md bg-gray-700'>
                {challenge.game_title}
              </p>
            </div>
            <ProfileOnePara className='mb-4 py-2 px-4 border-2 text-center rounded-md bg-profileone'>
              {challenge.description}
            </ProfileOnePara>
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
              <div className='text-center border-2 mx-10 mb-4 pt-1 rounded-md bg-complete'>
                <p className='text-xl'>Reward</p>
                <p className='pb-2 px-4'>
                  {challenge.prize}
                </p>
              </div>
            ) : null}

            {/* FEATURED TOGGLE */}
            {challenge.user_id === localStorage.getItem('id') ? (
              <div className='flex flex-col md:flex-row justify-evenly mb-4'>
                <button
                  onClick={() => {
                    setFeaturedOn(!featuredOn);
                    if (featuredOn) {
                      submitChallengeFeatured({ featured: false })
                    }
                    if (!featuredOn) {
                      submitChallengeFeatured({ featured: true })
                    }
                  }}
                  className={featuredOn ?
                    'rounded-lg text-lg px-12 py-3 md:mb-0 font-medium bg-addgreen hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out' :
                    'rounded-lg text-lg px-12 py-3 md:mb-0 font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out'}
                >
                  {featuredOn ? 'Featured!' : 'Not Featured'}
                </button>
              </div>
            ) : null}

            <div className='flex flex-col md:flex-row justify-evenly'>
              {/* EDIT BUTTON */}
              {challenge.user_id === localStorage.getItem('id') ? (
                <ProfileOneButton
                  onClick={() => setOpenEdit(true)}
                  className={`rounded-lg text-lg px-6 md:px-12 lg:px-6 xl:px-12 py-3 mb-4 md:mb-0 font-medium bg-profileone hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out`}
                >
                  Edit
                </ProfileOneButton>
              ) : null}

              {/* CHALLENGE ACCEPTED/ABANDONED BUTTONS */}
              {!acceptedChallenge && localStorage.getItem('token') ? (
                <ProfileOneButton
                  onClick={() => setOpenAccept(true)}
                  className={challenge.end_date && !countdownIsAfter ?
                    'pointer-events-none opacity-50 rounded-lg text-lg px-6 md:px-12 lg:px-6 xl:px-12 py-3 md:mb-0 font-medium bg-profileone hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out' :
                    'rounded-lg text-lg px-6 md:px-12 lg:px-6 xl:px-12 py-3 md:mb-0 font-medium bg-profileone hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out'}
                >
                  Accept
                </ProfileOneButton>
              ) : acceptedChallenge && localStorage.getItem('token') ? (
                <ProfileOneButton
                  onClick={() => setOpenAbandon(true)}
                  className={`rounded-lg text-lg px-6 md:px-12 lg:px-6 xl:px-12 py-3 md:mb-0 font-medium bg-profileone hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out`}
                >
                  Abandon
                </ProfileOneButton>
              ) : null}
            </div>
          </ProfileTwo>

          {/* LEADERBOARD */}
          <Leaderboard challenges_scores={challenges_high_scores ? challenges_high_scores : challenges_speedruns ? challenges_speedruns : challenges_for_glorys} challenge={challenge} setOpen={setOpenProgress} acceptedChallenge={acceptedChallenge} submitChallengeCompleted={submitChallengeCompleted} setOpenAccept={setOpenAccept} countdownIsAfter={countdownIsAfter} setCountdownIsAfter={setCountdownIsAfter} ProfileTwo={ProfileTwo} ProfileOneButton={ProfileOneButton} />
        </div >
      </ProfileOne>

      {/* Modals */}
      <AcceptChallengeModal open={openAccept} setOpen={setOpenAccept} submitChallengeAccepted={submitChallengeAccepted} />
      <AbandonChallengeModal open={openAbandon} setOpen={setOpenAbandon} submitChallengeAbandoned={submitChallengeAbandoned} />
      <EditChallengeModal open={openEdit} setOpen={setOpenEdit} setOpenDelete={setOpenDelete} submitChallengeEdit={submitChallengeEdit} loading={challengeLoading} challenge={challenge} />
      <DeleteChallengeModal open={openDelete} setOpen={setOpenDelete} submitChallengeDelete={submitChallengeDelete} loading={challengeLoading} />
      <SubmitChallengeProgressModal open={openProgress} setOpen={setOpenProgress} submitChallengeProgress={submitChallengeProgress} loading={challengeLoading} acceptedChallenge={acceptedChallenge} challenge={challenge} />
    </>
  );
}

export default ChallengeDetails;