import React, { useState } from 'react';

// ROUTING
import { Link, useHistory } from 'react-router-dom';

// TOAST
import cogoToast from 'cogo-toast';

// COMPONENTS
import AuthModal from '../components/utils/modals/AuthModal';

// ----------------------------------------------------------------------------------
// ------------------------------------ NAVBAR --------------------------------------
// ----------------------------------------------------------------------------------

const NavBar = ({ handleClearSearchBar, handleInputChange }) => {
  const [openAuth, setOpenAuth] = useState(false);
  const [authPage, setAuthPage] = useState('');
  const history = useHistory();

  // Function for logging out
  const logout = () => {
    localStorage.clear('token');
    localStorage.clear('username');
    localStorage.clear('email');
    cogoToast.success('Successfully logged out', {
      hideAfter: 3,
    });
    history.push('/');
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
          className='px-3 py-1 w-1/4 rounded hidden lg:block text-black'
          placeholder='Search for games'
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
            to='/' className='px-3 font-medium hover:text-navbarbuttonhighlight'
            onClick={() => { handleClearSearchBar(); logout() }}
          >
            <span className='mr-2'>{localStorage.getItem('username')}</span> [Logout]
          </button>
        ) : (
          // <Link to='/login' className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Login</Link>
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
      <AuthModal open={openAuth} setOpen={setOpenAuth} authPage={authPage} setAuthPage={setAuthPage} />
    </>
  );
}

export default NavBar;