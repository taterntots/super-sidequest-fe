import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchChallenges,
  challengeSelector
} from '../features/challenge/challengeSlice';

// ROUTING
import { useHistory } from 'react-router-dom';

// IMAGES
import HomeSplash from '../img/HomeSplash.jpg';

// COMPONENTS
import ChallengeList from '../features/challenge/ChallengeList.js';
import LoadSpinner from './LoadSpinner';
import ServerFailure from './ServerFailure';
import AuthModal from '../components/utils/modals/AuthModal';

// ----------------------------------------------------------------------------------
// ------------------------------------ HOMEPAGE ------------------------------------
// ----------------------------------------------------------------------------------

const HomePage = ({ searchTerm, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const { challenges, loading, error } = useSelector(challengeSelector)
  const [openAuth, setOpenAuth] = useState(false);
  const [authPage, setAuthPage] = useState('signup');
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchChallenges())
  }, [dispatch])

  return (
    <>
      <div className='py-24 px-4 bg-profiletwo rounded-md'>
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

      {/* Modals */}
      <AuthModal open={openAuth} setOpen={setOpenAuth} authPage={authPage} setAuthPage={setAuthPage} />


      {/* {loading ? (
        <LoadSpinner loading={loading} />
      ) : error ? (
        <ServerFailure />
      ) : (
        <div>
          <div>
            <h1 className='text-white font-medium text-2xl border-b-2'>
              Featured Challenges
            </h1>
            <ChallengeList challenges={challenges} loading={loading} error={error} searchTerm={searchTerm} handleClearSearchBar={handleClearSearchBar} />
          </div>

          <div>
            <h1 className='text-white font-medium text-2xl border-b-2'>
              Popular Challenges
            </h1>
            <ChallengeList challenges={challenges} loading={loading} error={error} searchTerm={searchTerm} handleClearSearchBar={handleClearSearchBar} />
          </div>

          <div>
            <h1 className='text-white font-medium text-2xl border-b-2'>
              Latest Challenges
            </h1>
            <ChallengeList challenges={challenges} loading={loading} error={error} searchTerm={searchTerm} handleClearSearchBar={handleClearSearchBar} />
          </div>
        </div>
      )} */}
    </>
  );
}

export default HomePage;