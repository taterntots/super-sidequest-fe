import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchRecentChallenges,
  fetchTaterFeaturedChallenge,
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
import Hero from '../components/HeroCard';

// ----------------------------------------------------------------------------------
// ------------------------------------ HOMEPAGE ------------------------------------
// ----------------------------------------------------------------------------------

const HomePage = ({ refresh, setRefresh }) => {
  const dispatch = useDispatch();
  const { recent_challenges, tater_featured_challenge } = useSelector(challengeSelector)
  const [openAuth, setOpenAuth] = useState(false);
  const [authPage, setAuthPage] = useState('signup');
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchRecentChallenges())
    dispatch(fetchTaterFeaturedChallenge(process.env.REACT_APP_TATER_ID))
  }, [dispatch, refresh])

  return (
    <>
      {/* HERO */}
      <Hero refresh={refresh} setRefresh={setRefresh} />

      {/* LEFT SIDE */}
      <div className='xl:flex justify-between'>
        <div className='w-full xl:w-7/12 mr-3'>
          {/* SITE DESCRIPTION */}
          <div className='px-4 sm:px-10 pb-4 mb-3 bg-profiletwo rounded-xl text-white'>
            <h1 className='text-center text-2xl font-medium py-4'>
              Create Gaming Challenges
            </h1>
            <ul className='pl-4 list-outside list-disc mb-4'>
              <li>
                Challenge friends and communities to custom quests
              </li>
              <li>
                Quests can be speedruns, high scores, or simply for bragging rights
              </li>
              <li>
                Accept and track quests from other users
              </li>
              <li>
                Compete in leaderboards for ultimate glory
              </li>
            </ul>
            <div className='flex justify-center'>
              <button
                className='bg-profileone text-center w-10/12 font-bold rounded-full py-4 uppercase tracking-wider transform transition duration-500 hover:scale-105'
                onClick={() =>
                  localStorage.getItem('token') ? history.push(`/${localStorage.getItem('username')}`) :
                    setOpenAuth(true)
                }
              >
                {localStorage.getItem('token') ? 'My Quests' : 'Get Started'}
              </button>
            </div>
          </div>
          {/* TATER'S QUEST */}
          {tater_featured_challenge.challenge_id ? (
            <FeaturedChallengeCard data={tater_featured_challenge} />
          ) : null}

          {/* TATER'S STREAM */}
          <div className='px-4 sm:px-10 mb-3 pb-4 bg-profiletwo rounded-xl text-white'>
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

        {/* RIGHT SIDE */}
        <div className='w-full xl:w-5/12'>
          {/* RECENT QUESTS */}
          <div className='px-4 sm:px-10 pb-4 bg-profiletwo rounded-xl text-white'>
            <h1 className='text-center text-2xl font-medium py-4'>
              Recent Quests
            </h1>
            <div className='grid gap-6 grid-cols-1'>
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
      <AuthModal open={openAuth} setOpen={setOpenAuth} authPage={authPage} setAuthPage={setAuthPage} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
}

export default HomePage;