import React, { useState } from 'react';

// ROUTING
import { useHistory } from 'react-router-dom';

// COMPONENTS
import AuthModal from '../components/utils/modals/AuthModal';

// IMAGES
import SuperSidequestBanner from '../img/SuperSidequestBanner.jpeg';

// ----------------------------------------------------------------------------------
// ------------------------------------- HERO ---------------------------------------
// ----------------------------------------------------------------------------------

const HeroCard = ({ refresh, setRefresh }) => {
  const [openAuth, setOpenAuth] = useState(false);
  const [authPage, setAuthPage] = useState('login');
  const history = useHistory();

  return (
    <>
      {/* HERO */}
      <div className='mb-3 cursor-pointer'>
        <img
          className='w-full object-contain rounded-md'
          src={SuperSidequestBanner}
          alt='img for Super Sidequest Banner'
          onClick={() =>
            localStorage.getItem('token') ? history.push(`/${localStorage.getItem('username')}`) :
              setOpenAuth(true)
          }
        />
      </div>

      {/* Modals */}
      <AuthModal open={openAuth} setOpen={setOpenAuth} authPage={authPage} setAuthPage={setAuthPage} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
}

export default HeroCard;