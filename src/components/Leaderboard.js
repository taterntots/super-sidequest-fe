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

const Leaderboard = ({ challenges_high_scores, setOpen, acceptedChallenge }) => {
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
              Update High Score
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
            High Score
          </p>
        </div>
        {challenges_high_scores.map((highscore, index) => (
          <div key={highscore.id} className='flex w-full text-center hover:bg-purple-500'>
            <p className='w-1/12'>{index + 1}</p>
            <div className='w-6/12'>
              <Link
                key={highscore.id}
                to={`/${highscore.username}`}
              // onClick={handleClearSearchBar}
              >
                {highscore.username}
              </Link>
            </div>
            <p className='w-3/12'>
              {highscore.high_score === null ? '---' : highscore.high_score}
            </p>
            {highscore.video_URL ? (
              <VideoIcon className='w-1/12 h-6 cursor-pointer' onClick={() => {
                setOpenVideo(true)
                setCurrentPlayer(highscore)
              }}
              />
            ) : (
              <VideoIcon className='invisible w-1/12 h-6' />
            )}
            {highscore.video_URL ? (
              <ImageIcon className='w-1/12 h-6' onClick={() => {
                // setOpenImage(true)
                setCurrentPlayer(highscore)
              }}
              />
            ) : (
              <ImageIcon className='invisible w-1/12 h-6' />
            )}
          </div>
        ))}
      </div>

      {/* Modals */}
      <VideoModal open={openVideo} setOpen={setOpenVideo} currentPlayer={currentPlayer} />
    </>
  );
};

export default Leaderboard;