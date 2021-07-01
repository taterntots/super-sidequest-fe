import React from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// IMAGES
import { ReactComponent as CopyrightIcon } from '../img/Copyright.svg';

// ----------------------------------------------------------------------------------
// ------------------------------------ FOOTER --------------------------------------
// ----------------------------------------------------------------------------------

const Footer = ({ handleClearSearchBar }) => {
  return (
    <>
      <div className='flex justify-center lg:justify-between items-center text-xl px-10 bg-black text-white font-medium'>
        <Link to='/about' className='hidden lg:block p-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >About Us</Link>
        <Link to='/faq' className='hidden lg:block p-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >FAQ</Link>
        <p className='flex p-3'><CopyrightIcon className='mr-1 self-center' />2021 Super Sidequest</p>
        <Link to='/terms' className='hidden lg:block p-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Rules & Terms</Link>
        <Link to='/contact' className='hidden lg:block p-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Contact Us</Link>
      </div>
    </>
  );
}

export default Footer;