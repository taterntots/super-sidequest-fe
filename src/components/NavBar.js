import React, { useState } from 'react';

// ROUTING
import { Link, useLocation } from 'react-router-dom';

// TOAST
import cogoToast from 'cogo-toast';

// COMPONENTS
import AuthModal from '../components/utils/modals/AuthModal';

// ----------------------------------------------------------------------------------
// ------------------------------------ NAVBAR --------------------------------------
// ----------------------------------------------------------------------------------

const NavBar = ({ refresh, setRefresh, handleClearSearchBar, handleInputChange }) => {
  const [openAuth, setOpenAuth] = useState(false);
  const [authPage, setAuthPage] = useState('');
  const location = useLocation();

  // Function for logging out
  const logout = () => {
    localStorage.clear();
    cogoToast.success('Successfully logged out', {
      hideAfter: 3,
    });
    setRefresh(!refresh)
  }

  return (
    <>
      <div className='flex justify-between items-center text-md md:text-xl py-2 px-10 bg-black text-white font-medium sticky top-0 z-50'>
        <Link to='/' className='px-3 hover:text-navbarbuttonhighlight text-center' onClick={handleClearSearchBar} >Home</Link>
        {localStorage.getItem('token') && localStorage.getItem('username') ? (
          <Link to={`/${localStorage.getItem('username')}`} className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >My Challenges</Link>
        ) : null}
        <Link to='/games' className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Games</Link>
        <Link to='/support' className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Support Us</Link>
        <input
          id='searchBar'
          className={
            location.pathname.includes('/challenges') && !location.pathname.includes('challenges/') ||
              location.pathname === ('/games')
              ? 'px-3 py-1 w-1/4 rounded hidden lg:block text-black'
              : 'invisible px-3 py-1 w-1/4 rounded hidden lg:block text-black'}
          placeholder={location.pathname.includes('/challenges') ? 'Search by keyword'
            : location.pathname === ('/games') ? 'Search by game'
              : ''}
          onChange={handleInputChange}
          type='search'
        />
        {localStorage.getItem('token') ? null : (
          <button
            className='px-3 font-medium hover:text-navbarbuttonhighlight focus:outline-none'
            onClick={() => {
              setAuthPage('signup')
              setOpenAuth(true)
              handleClearSearchBar()
            }}
          >
            Sign Up
          </button>)}
        {localStorage.getItem('token') ? (
          <button
            to='/' className='px-3 font-medium hover:text-navbarbuttonhighlight focus:outline-none'
            onClick={() => { handleClearSearchBar(); logout() }}
          >
            <span className='mr-2'>{localStorage.getItem('username')}</span> [Logout]
          </button>
        ) : (
          <button
            className='px-3 font-medium hover:text-navbarbuttonhighlight focus:outline-none'
            onClick={() => {
              setAuthPage('login')
              setOpenAuth(true)
              handleClearSearchBar()
            }}
          >
            Login
          </button>
        )}
      </div>

      {/* Modals */}
      <AuthModal open={openAuth} setOpen={setOpenAuth} authPage={authPage} setAuthPage={setAuthPage} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
}

export default NavBar;