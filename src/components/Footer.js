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
      <div className='flex justify-between items-center text-md md:text-xl py-2 px-10 bg-black text-white font-medium'>
        <Link to='/about' className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >About Us</Link>
        <Link to='/faq' className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >FAQ</Link>
        <p className='flex px-3'><CopyrightIcon className='mr-1 self-center' />2021 Tater's Tavern</p>
        <Link to='/terms' className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Rules & Terms</Link>
        <Link to='/contact' className='px-3 hover:text-navbarbuttonhighlight' onClick={handleClearSearchBar} >Contact Us</Link>
      </div>
    </>
  );
}

export default Footer;