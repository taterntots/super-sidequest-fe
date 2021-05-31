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

const Leaderboard = ({ challenges_high_scores }) => {
  const [openVideo, setOpenVideo] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState({})

  return (
    <>
      <div className="w-3/5 p-10 bg-taterpurple rounded-lg text-white">
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
          <div key={highscore.id} className='flex w-full text-center'>
            <p className='w-1/12'>{index + 1}</p>
            <Link
              key={highscore.id}
              to={`/${highscore.username}`}
              className='w-6/12'
            // onClick={handleClearSearchBar}
            >
              {highscore.username}
            </Link>
            <p className='w-3/12'>
              {highscore.high_score === null ? '---' : highscore.high_score}
            </p>
            {highscore.video_URL ? (
              <VideoIcon className='w-1/12 h-6' onClick={() => {
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