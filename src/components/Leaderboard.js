import React, { useState, useEffect } from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// IMAGES
import { ReactComponent as VideoIcon } from '../img/VideoIcon.svg'
import { ReactComponent as ImageIcon } from '../img/ImageIcon.svg'

// COMPONENTS
import VideoModal from '../components/utils/modals/VideoModal';
import ImageModal from '../components/utils/modals/ImageModal';

// ----------------------------------------------------------------------------------
// ---------------------------------- LEADERBOARD -----------------------------------
// ----------------------------------------------------------------------------------

const Leaderboard = ({ challenges_scores, challenge, setOpen, acceptedChallenge, submitChallengeCompleted }) => {
  const [openVideo, setOpenVideo] = useState(false)
  const [openImage, setOpenImage] = useState(false)
  const [on, setOn] = useState(acceptedChallenge.completed)
  const [currentPlayer, setCurrentPlayer] = useState({})

  // UseEffect that sets the toggle correctly on refresh based on whether a challenge is completed or not
  useEffect(() => {
    setOn(acceptedChallenge.completed)
  }, [acceptedChallenge.completed])

  return (
    <>
      <div className="w-3/5 h-full p-10 bg-taterpurple rounded-lg text-white">
        {acceptedChallenge && localStorage.getItem('token') ? (
          <div className='flex justify-end'>
            <button
              onClick={() => setOpen(true)}
              className={`rounded-lg text-lg px-24 md:px-12 py-3 font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
            >
              {challenge.is_high_score ? 'Update High Score' : challenge.is_speedrun ? 'Update Speedrun' : null}
            </button>
            <span
              onClick={() => {
                setOn(!on);
                if (on) {
                  submitChallengeCompleted({ completed: false })
                }
                if (!on) {
                  submitChallengeCompleted({ completed: true })
                }
              }}
              role='checkbox'
              tabIndex='0'
              aria-checked='false'
              className={`${on ? 'bg-purplebutton' : 'bg-gray-300'
                } relative mx-3 inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}
            >
              {/* <!-- On: "translate-x-5", Off: "translate-x-0" --> */}
              <span
                aria-hidden='true'
                className={`${on ? 'translate-x-5' : 'translate-x-0'
                  } translate-x-0 relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
              >
                {/* <!-- On: "opacity-0 ease-out duration-100", Off: "opacity-100 ease-in duration-200" --> */}
                <span
                  className={`${on
                    ? 'opacity-0 ease-out duration-100'
                    : 'opacity-100 ease-in duration-200'
                    } opacity-100 ease-in duration-200 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                ></span>
                {/* <!-- On: "opacity-100 ease-in duration-200", Off: "opacity-0 ease-out duration-100" --> */}
                <span
                  className={`${on
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
          </div>

        ) : null}
        <h1 className='mb-3 text-center'>
          LEADERBOARD
        </h1>
        <div className='flex w-full text-center'>
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
          <div key={score.id} className='flex w-full text-center hover:bg-purple-500'>
            <p className='w-1/12'>{index + 1}</p>
            <div className='w-6/12'>
              <Link
                key={score.id}
                to={`/${score.username}`}
              // onClick={handleClearSearchBar}
              >
                {score.username}
              </Link>
            </div>
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
      </div>

      {/* Modals */}
      <VideoModal open={openVideo} setOpen={setOpenVideo} currentPlayer={currentPlayer} />
      <ImageModal open={openImage} setOpen={setOpenImage} currentPlayer={currentPlayer} />
    </>
  );
};

export default Leaderboard;