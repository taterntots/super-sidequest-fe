import React, { useState } from 'react';
import { Transition } from '@headlessui/react'

// ROUTING
import { Link, useLocation } from 'react-router-dom';

// TOAST
import cogoToast from 'cogo-toast';

// IMAGES
import { ReactComponent as MenuDropdown } from '../img/MenuDropdown.svg';

// COMPONENTS
import AuthModal from './utils/modals/AuthModal';

// ----------------------------------------------------------------------------------
// ------------------------------------ NAVBAR --------------------------------------
// ----------------------------------------------------------------------------------

const NavBar = ({ refresh, setRefresh, handleClearSearchBar, handleInputChange }) => {
  const [openAuth, setOpenAuth] = useState(false);
  const [authPage, setAuthPage] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  // Function for logging out
  const logout = () => {
    localStorage.clear();
    cogoToast.success('Successfully logged out', {
      hideAfter: 5,
    });
    setRefresh(!refresh)
  }

  return (
    <>
      <div className='flex justify-between items-center text-xl pl-0 pr-4 lg:px-4 bg-black text-white font-medium sticky top-0 z-50'>
        {/* NAVBAR DROPDOWN */}
        <div className='relative block lg:hidden'>
          <button
            onClick={() => {
              setDropdown(!dropdown);
            }}
            className='focus:outline-none p-4 hover:bg-navbarmobilehighlight'
          >
            <MenuDropdown />
          </button>
          <Transition
            show={dropdown}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <div className='absolute w-48 origin-top-right shadow-lg'>
              <div
                className='bg-black divide-y rounded-br-md shadow-xs divide-gray-500'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='user-menu'
              >
                <Link
                  to={`/`}
                  onClick={() => {
                    handleClearSearchBar()
                    setDropdown(!dropdown)
                  }}
                  className='block w-full px-4 py-2 text-sm font-bold text-center transition duration-150 ease-in-out hover:bg-navbarmobilehighlight'
                >
                  Home
                </Link>
                {localStorage.getItem('token') && localStorage.getItem('username') ? (
                  <Link
                    to={`/${localStorage.getItem('username')}`}
                    onClick={() => {
                      handleClearSearchBar()
                      setDropdown(!dropdown)
                    }}
                    className='block w-full px-4 py-2 text-sm font-bold text-center transition duration-150 ease-in-out hover:bg-navbarmobilehighlight'
                  >
                    My Quests
                  </Link>
                ) : null}
                <Link
                  to={`/games`}
                  onClick={() => {
                    handleClearSearchBar()
                    setDropdown(!dropdown)
                  }}
                  className='block w-full px-4 py-2 text-sm font-bold text-center transition duration-150 ease-in-out hover:bg-navbarmobilehighlight'
                >
                  Games
                </Link>
                <Link
                  to={`/users`}
                  onClick={() => {
                    handleClearSearchBar()
                    setDropdown(!dropdown)
                  }}
                  className='block w-full px-4 py-2 text-sm font-bold text-center transition duration-150 ease-in-out hover:bg-navbarmobilehighlight'
                >
                  Users
                </Link>
                <Link
                  to={`/support`}
                  onClick={() => {
                    handleClearSearchBar()
                    setDropdown(!dropdown)
                  }}
                  className='block w-full px-4 py-2 text-sm font-bold text-center transition duration-150 ease-in-out hover:bg-navbarmobilehighlight'
                >
                  Support Us
                </Link>
                <Link
                  to={`/faq`}
                  onClick={() => {
                    handleClearSearchBar()
                    setDropdown(!dropdown)
                  }}
                  className='block w-full px-4 py-2 text-sm font-bold text-center transition duration-150 ease-in-out hover:bg-navbarmobilehighlight'
                >
                  FAQ
                </Link>
                <Link
                  to={`/about`}
                  onClick={() => {
                    handleClearSearchBar()
                    setDropdown(!dropdown)
                  }}
                  className='block w-full px-4 py-2 text-sm font-bold text-center transition duration-150 ease-in-out hover:bg-navbarmobilehighlight'
                >
                  About Us
                </Link>
                <Link
                  to={`/terms`}
                  onClick={() => {
                    handleClearSearchBar()
                    setDropdown(!dropdown)
                  }}
                  className='block w-full px-4 py-2 text-sm font-bold text-center transition duration-150 ease-in-out hover:bg-navbarmobilehighlight'
                >
                  Rules & Terms
                </Link>
                <Link
                  to={`/contact`}
                  onClick={() => {
                    handleClearSearchBar()
                    setDropdown(!dropdown)
                  }}
                  className='block w-full px-4 py-2 text-sm font-bold text-center transition duration-150 ease-in-out hover:bg-navbarmobilehighlight'
                >
                  Contact
                </Link>
                {localStorage.getItem('token') ? (
                  <button
                    type='button'
                    onClick={() => {
                      logout()
                      handleClearSearchBar()
                      setDropdown(!dropdown)
                    }}
                    className='block w-full px-4 py-2 text-sm font-bold text-center transition duration-150 ease-in-out hover:bg-navbarmobilehighlight'
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={() => {
                      setAuthPage('login')
                      setOpenAuth(true)
                      handleClearSearchBar()
                      setDropdown(!dropdown);
                    }}
                    className='block w-full px-4 py-2 text-sm font-bold text-center transition duration-150 ease-in-out hover:bg-navbarmobilehighlight'
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </Transition>
        </div>

        {/* NAVBAR PROPER */}
        <Link to='/' className='hidden lg:block px-3 py-3 hover:text-navbarbuttonhighlight text-center' onClick={handleClearSearchBar}>Home</Link>
        {localStorage.getItem('token') && localStorage.getItem('username') ? (
          <Link to={`/${localStorage.getItem('username')}`} className='hidden lg:block px-3 py-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >My Quests</Link>
        ) : null}
        <Link to='/games' className='hidden lg:block px-3 py-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Games</Link>
        <Link to='/users' className='hidden lg:block px-3 py-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Users</Link>
        <Link to='/support' className='hidden lg:block px-3 py-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Support Us</Link>
        <input
          id='searchBar'
          className={
            location.pathname.includes('/challenges') && !location.pathname.includes('challenges/') ||
              location.pathname === ('/games') ||
              location.pathname === ('/games/private') ||
              location.pathname === ('/challenges/all') ||
              location.pathname === ('/users') ||
              location.pathname === ('/users/banned') ||
              location.pathname.includes('/friends')
              ? 'px-3 py-1 w-full lg:w-1/4 ml-4 lg:ml-0 rounded text-black'
              : 'invisible px-3 py-1 w-1/4 rounded text-black'}
          placeholder={location.pathname.includes('/challenges') || location.pathname.includes('/challenges/all') ? 'Search by keyword'
            : location.pathname.includes('/games') ? 'Search by game'
              : location.pathname.includes('/users') || location.pathname.includes('/friends') ? 'Search by username'
                : ''}
          onChange={handleInputChange}
          type='search'
        />
        {localStorage.getItem('token') ? null : (
          <button
            className='hidden lg:block px-3 py-3 font-medium hover:text-navbarbuttonhighlight focus:outline-none'
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
            to='/' className='hidden lg:block px-3 py-3 font-medium hover:text-navbarbuttonhighlight focus:outline-none'
            onClick={() => { handleClearSearchBar(); logout() }}
          >
            <span className='mr-2'>{localStorage.getItem('username')}</span> [Logout]
          </button>
        ) : (
          <button
            className='hidden lg:block px-3 py-3 font-medium hover:text-navbarbuttonhighlight focus:outline-none'
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