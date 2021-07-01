import React, { useState } from 'react';

// ROUTING
import { useHistory } from 'react-router-dom';

// COMPONENTS
import AuthModal from '../components/utils/modals/AuthModal';

// ----------------------------------------------------------------------------------
// ------------------------------------- HERO ---------------------------------------
// ----------------------------------------------------------------------------------

const Hero = () => {
  const [openAuth, setOpenAuth] = useState(false);
  const [authPage, setAuthPage] = useState('signup');
  const history = useHistory();

  return (
    <>
      {/* HERO */}
      <div className='py-24 px-4 mb-3 bg-profileone rounded-md'>
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
            {localStorage.getItem('token') ? 'My Quests' : 'Get Started'}
          </button>
        </div>
      </div>

      {/* Modals */}
      <AuthModal open={openAuth} setOpen={setOpenAuth} authPage={authPage} setAuthPage={setAuthPage} />
    </>
  );
}

export default Hero;