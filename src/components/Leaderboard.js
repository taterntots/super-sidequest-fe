import React, { useState, useEffect } from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// DATE
import moment from 'moment';

// IMAGES
import { ReactComponent as VideoIcon } from '../img/VideoIcon.svg'
import { ReactComponent as ImageIcon } from '../img/ImageIcon.svg'

// COMPONENTS
import VideoModal from '../components/utils/modals/VideoModal';
import ImageModal from '../components/utils/modals/ImageModal';
import Timer from '../components/utils/Timer';

// ----------------------------------------------------------------------------------
// ---------------------------------- LEADERBOARD -----------------------------------
// ----------------------------------------------------------------------------------

const Leaderboard = ({ challenge_high_scores, challenge_speedruns, challenge_for_glorys, challenge, setOpen, setOpenAccept, acceptedChallenge, submitChallengeCompleted, countdownIsAfter, setCountdownIsAfter, ProfileTwo, ProfileOneButton }) => {
  const challengeScores = challenge.is_high_score ? challenge_high_scores : challenge.is_speedrun ? challenge_speedruns : challenge_for_glorys;
  const [openVideo, setOpenVideo] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [completedOn, setCompletedOn] = useState(acceptedChallenge.completed);
  const [currentPlayer, setCurrentPlayer] = useState({});

  // UseEffect that sets the toggle correctly on refresh based on whether a challenge is completed or not
  useEffect(() => {
    setCompletedOn(acceptedChallenge.completed)
  }, [acceptedChallenge.completed])

  return (
    <>
      <ProfileTwo className="w-full lg:w-3/5 h-full pb-4 px-10 bg-profiletwo rounded-lg text-white">
        <h1 className='text-center text-2xl font-medium pt-4 mt-4 lg:my-0'>
          Leaderboard
        </h1>

        {challenge.end_date ? (
          <div className='mb-4'>
            {countdownIsAfter ? ( // Checks if challenge end date has passed
              <Timer end_date={challenge.end_date} setCountdownIsAfter={setCountdownIsAfter} setChallengeUpdateModel={setOpen} setOpenAccept={setOpenAccept} />
            ) : (
              <p className='font-medium text-lg text-center'>Quest Ended</p>
            )}
          </div>
        ) : null}

        <div className='rounded-lg bg-gray-700 mt-4'>
          <div className='flex w-full text-center px-2 py-1 font-bold'>
            <p className='w-1/12'>Rank</p>
            <p className='w-6/12'>
              Player
            </p>
            <p className='w-3/12'>
              {challenge.is_high_score ? 'High Score' : challenge.is_speedrun ? 'Time' : 'Date'}
            </p>
          </div>

          {/* LEADERBOARD DATA */}
          {challengeScores ? challengeScores.map((score, index) => (
            <div key={score.id} className={score.username === localStorage.getItem('username') ?
              `flex text-center font-medium text-graybutton bg-white px-2 py-1 hover:opacity-60 hover:bg-white hover:text-graybutton` :
              `flex text-center font-medium ${index % 2 ? 'bg-gray-600' : 'bg-gray-500'} px-2 py-1 hover:opacity-60`}>
              <p className='w-1/12'>{index + 1}</p>
              <Link
                key={score.id}
                to={`/${score.username}`}
                className='w-6/12'
              >
                {score.username}
              </Link>
              {challenge.is_high_score ? (
                <p className='w-3/12'>
                  {score.high_score === null ? '---' : score.high_score}
                </p>
              ) : challenge.is_speedrun ? (
                <p className='w-3/12'>
                  {score.speedrun_hours === 0 &&
                    score.speedrun_minutes === 0 &&
                    score.speedrun_seconds === 0 &&
                    score.speedrun_milliseconds === 0 ?
                    '---'
                    :
                    score.speedrun_hours === null &&
                      score.speedrun_minutes === null &&
                      score.speedrun_seconds === null &&
                      score.speedrun_milliseconds === null ?
                      '---'
                      :
                      score.speedrun_hours === 0 &&
                        score.speedrun_minutes === 0 &&
                        score.speedrun_seconds > 0 &&
                        score.speedrun_milliseconds > 0 ?
                        `${score.speedrun_seconds}s ${score.speedrun_milliseconds}ms`
                        :
                        score.speedrun_hours === 0 &&
                          score.speedrun_minutes === 0 &&
                          score.speedrun_seconds > 0 &&
                          score.speedrun_milliseconds === 0 ?
                          `${score.speedrun_seconds}s`
                          :
                          `${score.speedrun_hours ? score.speedrun_hours + 'h' : ''} ${score.speedrun_minutes}m ${score.speedrun_seconds}s ${score.speedrun_milliseconds ? score.speedrun_milliseconds + 'ms' : ''}`
                  }
                </p>
              ) : (
                <p className='w-3/12'>
                  {score.completed ? moment(score.updated_at).format("MM/DD/YYYY hh:mm:ss") : '---'}
                </p>
              )}

              {score.video_URL ? (
                <VideoIcon className='w-1/12 h-6 cursor-pointer' onClick={() => {
                  setOpenVideo(true)
                  setCurrentPlayer(score)
                }}
                />
              ) : (
                <VideoIcon className='invisible w-1/12 h-6' />
              )}
              {score.image_URL ? (
                <ImageIcon className='w-1/12 h-6 cursor-pointer' onClick={() => {
                  setOpenImage(true)
                  setCurrentPlayer(score)
                }}
                />
              ) : (
                <ImageIcon className='invisible w-1/12 h-6' />
              )}
            </div>
          )) : null}
          <p className='invisible'>
            INVISIBLE TEXT TO SHOW ROUNDED BORDER
          </p>
        </div>

        {/* UPDATE PERSONAL BEST BUTTONS */}
        <div className='mt-4'>
          {acceptedChallenge && localStorage.getItem('token') ? (
            <div className='flex flex-col md:flex-row justify-evenly'>
              <ProfileOneButton
                onClick={() => setOpen(true)}
                className={acceptedChallenge.completed || (!countdownIsAfter && challenge.end_date) ?
                  `pointer-events-none opacity-50 rounded-lg text-lg px-12 py-3 mb-4 md:mb-0 font-medium bg-profileone hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out` :
                  'rounded-lg text-lg px-12 py-3 mb-4 md:mb-0 font-medium bg-profileone hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out'}
              >
                {challenge.is_high_score ? 'Update High Score' : challenge.is_speedrun ? 'Update Speedrun' : 'Update Status'}
              </ProfileOneButton>
              <button
                onClick={() => {
                  setCompletedOn(!completedOn);
                  if (completedOn) {
                    submitChallengeCompleted({ completed: false })
                  }
                  if (!completedOn) {
                    submitChallengeCompleted({ completed: true })
                  }
                }}
                className={completedOn ?
                  'rounded-lg text-lg px-12 py-3 md:mb-0 font-medium bg-complete hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out' :
                  !completedOn && challenge.is_high_score && !acceptedChallenge.high_score ?
                    'pointer-events-none opacity-50 rounded-lg text-lg px-12 py-3 md:mb-0 font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out' :
                    !completedOn && challenge.is_speedrun && !acceptedChallenge.total_milliseconds ?
                      'pointer-events-none opacity-50 rounded-lg text-lg px-12 py-3 md:mb-0 font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out' :
                      'rounded-lg text-lg px-12 py-3 md:mb-0 font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:ring transition duration-150 ease-in-out'}
              >
                {completedOn ? 'Completed!' : 'Incomplete'}
              </button>
            </div>
          ) : null}
        </div>
      </ProfileTwo>

      {/* Modals */}
      <VideoModal open={openVideo} setOpen={setOpenVideo} currentPlayer={currentPlayer} />
      <ImageModal open={openImage} setOpen={setOpenImage} currentPlayer={currentPlayer} />
    </>
  );
};

export default Leaderboard;