import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchRecentChallenges,
  challengeSelector
} from '../features/challenge/challengeSlice';

// ROUTING
import { Link, useHistory } from 'react-router-dom';

// IMAGES
import HomeSplash from '../img/HomeSplash.jpg';

// COMPONENTS
import ChallengeCard from '../features/challenge/ChallengeCard.js';
import LoadSpinner from './LoadSpinner';
import ServerFailure from './ServerFailure';
import AuthModal from '../components/utils/modals/AuthModal';

// ----------------------------------------------------------------------------------
// ------------------------------------ HOMEPAGE ------------------------------------
// ----------------------------------------------------------------------------------

const HomePage = () => {
  const dispatch = useDispatch();
  const { recentChallenges, loading, error } = useSelector(challengeSelector)
  const [openAuth, setOpenAuth] = useState(false);
  const [authPage, setAuthPage] = useState('signup');
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchRecentChallenges())
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

      {/* TATER'S QUEST */}
      <div className="lg:flex justify-between">
        <div className="mr-3 w-full lg:w-3/5 h-full pb-4 px-10 mb-0 sm:mb-3 bg-profileone rounded-lg text-white">
          <h1 className='text-center text-2xl font-medium py-4'>
            Tater's Quest
          </h1>


        </div>

        {/* RECENT QUESTS */}
        <div className='w-full lg:w-2/5'>
          <div className="px-10 pb-4 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4'>
              Recent Quests
            </h1>
            <div className='grid gap-6 grig-cols-1'>
              {recentChallenges.map(challenge => (
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