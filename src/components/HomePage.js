import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchRecentChallenges,
  fetchUserFeaturedChallenge,
  challengeSelector
} from '../features/challenge/challengeSlice';

// ROUTING
import { Link, useHistory } from 'react-router-dom';

// REACT PLAYER
import ReactPlayer from 'react-player/twitch';

// COMPONENTS
import ChallengeCard from '../features/challenge/ChallengeCard.js';
import FeaturedChallengeCard from '../features/challenge/FeaturedChallengeCard.js';
import AuthModal from '../components/utils/modals/AuthModal';

// ----------------------------------------------------------------------------------
// ------------------------------------ HOMEPAGE ------------------------------------
// ----------------------------------------------------------------------------------

const HomePage = () => {
  const dispatch = useDispatch();
  const { recent_challenges, featured_challenge } = useSelector(challengeSelector)
  const [openAuth, setOpenAuth] = useState(false);
  const [authPage, setAuthPage] = useState('signup');
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchRecentChallenges())
    dispatch(fetchUserFeaturedChallenge(process.env.REACT_APP_TATER_ID))
  }, [dispatch])

  return (
    <>
      {/* HERO */}
      <div className='py-24 px-4 mb-3 bg-profiletwo rounded-md'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-2 text-white'>
            Super Sidequest
          </h1>
          <h2 className='text-2xl mb-8 text-gray-200'>
            Create challenges for your friends and communities.
          </h2>
          <button
            className='bg-white font-bold rounded-full py-4 px-8 uppercase tracking-wider transform transition duration-500 hover:scale-105'
            onClick={() =>
              localStorage.getItem('token') ? history.push(`/${localStorage.getItem('username')}`) :
                setOpenAuth(true)
            }
          >
            {localStorage.getItem('token') ? 'My Challenges' : 'Get Started'}
          </button>
        </div>
      </div>

      <div className="lg:flex justify-between">
        <div className='w-full lg:w-3/5 mr-3'>
          {/* TATER'S QUEST */}
          {featured_challenge.challenge_id ? (
            <FeaturedChallengeCard data={featured_challenge} />
          ) : null}

          {/* TATER'S STREAM */}
          <div className="px-10 mb-3 pb-4 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4'>
              Tater & Tots
            </h1>
            <ReactPlayer
              url='https://www.twitch.tv/tater_n_tots'
              width='100%'
              muted={true}
              controls
            />
          </div>
        </div>

        {/* RECENT QUESTS */}
        <div className='w-full lg:w-2/5'>
          <div className="px-10 pb-4 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4'>
              Recent Quests
            </h1>
            <div className='grid gap-6 grig-cols-1'>
              {recent_challenges.map(challenge => (
                <Link
                  key={challenge.challenge_id}
                  to={`/${challenge.username}/challenges/${challenge.challenge_id}`}
                >
                  <ChallengeCard
                    key={challenge.challenge_id}
                    data={challenge}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div >

      {/* Modals */}
      <AuthModal open={openAuth} setOpen={setOpenAuth} authPage={authPage} setAuthPage={setAuthPage} />
    </>
  );
}

export default HomePage;