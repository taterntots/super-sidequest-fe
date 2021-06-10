import React, { useState, useEffect } from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// IMAGES
import { ReactComponent as VideoIcon } from '../img/VideoIcon.svg'
import { ReactComponent as ImageIcon } from '../img/ImageIcon.svg'

// COMPONENTS
import VideoModal from '../components/utils/modals/VideoModal';
import ImageModal from '../components/utils/modals/ImageModal';
import Toggle from '../components/utils/buttons/Toggle';

// ----------------------------------------------------------------------------------
// ---------------------------------- LEADERBOARD -----------------------------------
// ----------------------------------------------------------------------------------

const Leaderboard = ({ challenges_scores, challenge, setOpen, acceptedChallenge, submitChallengeCompleted }) => {
  const [openVideo, setOpenVideo] = useState(false)
  const [openImage, setOpenImage] = useState(false)
  const [completedOn, setCompletedOn] = useState(acceptedChallenge.completed)
  const [currentPlayer, setCurrentPlayer] = useState({})

  // UseEffect that sets the toggle correctly on refresh based on whether a challenge is completed or not
  useEffect(() => {
    setCompletedOn(acceptedChallenge.completed)
  }, [acceptedChallenge.completed])

  return (
    <>
      <div className="w-full lg:w-3/5 h-full pb-4 px-10 bg-profileone rounded-lg text-white">
        <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
          Leaderboard
        </h1>
        <div className='rounded-lg bg-gray-700'>
          <div className='flex w-full text-center py-1 font-bold'>
            <p className='w-1/12'>Rank</p>
            <p className='w-6/12'>
              Player
            </p>
            <p className='w-3/12'>
              {challenge.is_high_score ? 'High Score' : challenge.is_speedrun ? 'Time' : null}
            </p>
          </div>

          {/* LEADERBOARD DATA */}
          {challenges_scores ? challenges_scores.map((score, index) => (
            <div key={score.id} className={`flex text-center ${index % 2 ? 'bg-gray-600' : 'bg-gray-500'} py-1 hover:bg-white hover:text-profiletwo`}>
              <p className='w-1/12'>{index + 1}</p>
              <Link
                key={score.id}
                to={`/${score.username}`}
                className='w-6/12'
              // onClick={handleClearSearchBar}
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
                </p>) : null}

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
            <div className='flex justify-evenly'>
              <button
                onClick={() => setOpen(true)}
                className={`rounded-lg text-lg px-24 md:px-12 py-3 font-medium bg-profiletwo hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
              >
                {challenge.is_high_score ? 'Update High Score' : challenge.is_speedrun ? 'Update Speedrun' : null}
              </button>
              <div className='flex self-center'>
                <p className='font-bold'>Completed:</p>
                <Toggle on={completedOn} setOn={setCompletedOn} submitFunction={submitChallengeCompleted} />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Modals */}
      <VideoModal open={openVideo} setOpen={setOpenVideo} currentPlayer={currentPlayer} />
      <ImageModal open={openImage} setOpen={setOpenImage} currentPlayer={currentPlayer} />
    </>
  );
};

export default Leaderboard;