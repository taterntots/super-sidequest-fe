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
  const [removeText, setRemoveText] = useState({ text: '', username: '' });

  // UseEffect that sets the toggle correctly on refresh based on whether a challenge is completed or not
  useEffect(() => {
    setCompletedOn(acceptedChallenge.completed)
  }, [acceptedChallenge.completed])

  return (
    <>
      <ProfileTwo className='w-full lg:w-3/5 h-full pb-4 px-4 sm:px-10 bg-profiletwo rounded-lg text-white'>
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
          <div className='flex w-full text-center font-bold'>
            <p className='w-1/12 pl-2 py-1'>Rank</p>
            <p className='w-6/12 py-1'>
              Player
            </p>
            <p className='w-3/12 py-1'>
              {challenge.is_high_score ? 'High Score' : challenge.is_speedrun ? 'Time' : 'Date'}
            </p>
          </div>

          {/* LEADERBOARD DATA */}
          {challengeScores ? challengeScores.map((score, index) => (
            <div key={score.id} className={score.username === localStorage.getItem('username') ?
              `flex text-center items-center font-medium text-graybutton bg-white hover:opacity-60 hover:bg-white hover:text-graybutton` :
              `flex text-center items-center font-medium ${index % 2 ? 'bg-gray-600' : 'bg-gray-500'} hover:opacity-60`}>
              <p className='w-1/12 pl-2 py-1'>{index + 1}</p>
              <Link
                key={score.id}
                to={`/${score.username}`}
                className='w-6/12 py-1'
              >
                {score.username}
              </Link>
              {challenge.is_high_score ? (
                <p className='w-3/12 py-1'>
                  {score.high_score === null ? '---' : Number(score.high_score).toLocaleString()}
                </p>
              ) : challenge.is_speedrun ? (
                <p className='w-3/12 py-1'>
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
                <p className={challenge.user_id === localStorage.getItem('id') ?
                  'w-3/12 py-1 hover:text-removered cursor-pointer' :
                  'w-3/12 py-1'}
                  onMouseOver={challenge.user_id === localStorage.getItem('id') ?
                    () => setRemoveText({ text: 'Remove', username: score.username }) :
                    null}
                  onMouseOut={challenge.user_id === localStorage.getItem('id') ?
                    () => setRemoveText(score.completed ? moment(score.updated_at).format("MM/DD/YYYY hh:mm:ss") : '---') :
                    null}
                >
                  {removeText.text && score.username === removeText.username ? removeText.text :
                    score.completed ? moment(score.updated_at).format("MM/DD/YYYY hh:mm:ss") : '---'}
                </p>
              )}

              {/* PROOF ICONS */}
              <div className='sm:flex w-2/12 justify-evenly'>
                {score.video_URL ? (
                  <VideoIcon className='w-full h-7 cursor-pointer hover:text-addgreen' onClick={() => {
                    setOpenVideo(true)
                    setCurrentPlayer(score)
                  }}
                  />
                ) : (
                  <VideoIcon className='invisible h-7' />
                )}
                {score.image_URL ? (
                  <ImageIcon className='w-full h-7 cursor-pointer hover:text-addgreen' onClick={() => {
                    setOpenImage(true)
                    setCurrentPlayer(score)
                  }}
                  />
                ) : (
                  <ImageIcon className='invisible h-7' />
                )}
              </div>

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