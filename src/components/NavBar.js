import React from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// ------------------------------------ NAVBAR --------------------------------------
// ----------------------------------------------------------------------------------

const NavBar = () => {
  return (
    <div className='flex justify-between items-center text-md md:text-xl py-2 px-10 bg-black text-white font-medium sticky top-0 z-50'>
      <Link className='px-3 hover:text-navbarbuttonhighlight text-center'>Home</Link>
      <Link className='px-3 hover:text-navbarbuttonhighlight'>My Challenges</Link>
      <Link className='px-3 hover:text-navbarbuttonhighlight'>Support Us</Link>
      <input className='px-3 py-1 w-2/5 rounded hidden lg:block text-black' placeholder='Search for games' />
      <Link className='px-3 hover:text-navbarbuttonhighlight'>Sign Up</Link>
      <Link className='px-3 hover:text-navbarbuttonhighlight'>Login</Link>
    </div>
  );
}

export default NavBar;