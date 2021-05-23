import React from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// ------------------------------------ NAVBAR --------------------------------------
// ----------------------------------------------------------------------------------

const NavBar = ({ handleClearSearchBar, handleInputChange }) => {
  return (
    <>
      <div className='flex justify-between items-center text-md md:text-xl py-2 px-10 bg-black text-white font-medium sticky top-0 z-50'>
        <Link to='/' className='px-3 hover:text-navbarbuttonhighlight text-center' onClick={handleClearSearchBar} >Home</Link>
        <Link to='/counter' className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >My Challenges</Link>
        <Link to='/games' className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Games</Link>
        <Link to='/support' className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Support Us</Link>
        <input
          id='searchBar'
          className='px-3 py-1 w-1/4 rounded hidden lg:block text-black'
          placeholder='Search for games'
          onChange={handleInputChange}
          type='search'
        />
        <Link to='/signup' className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Sign Up</Link>
        <Link to='/login' className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Login</Link>
      </div>
    </>
  );
}

export default NavBar;