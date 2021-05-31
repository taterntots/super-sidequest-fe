import React, { useState } from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// IMAGES
import { ReactComponent as VideoIcon } from '../img/VideoIcon.svg'
import { ReactComponent as ImageIcon } from '../img/ImageIcon.svg'

// COMPONENTS
import VideoModal from '../components/utils/modals/VideoModal';

// ----------------------------------------------------------------------------------
// ---------------------------------- LEADERBOARD -----------------------------------
// ----------------------------------------------------------------------------------

const Leaderboard = ({ challenges_scores, challenge, setOpen, acceptedChallenge }) => {
  const [openVideo, setOpenVideo] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState({})

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
            {score.video_URL ? (
              <ImageIcon className='w-1/12 h-6' onClick={() => {
                // setOpenImage(true)
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
    </>
  );
};

export default Leaderboard;