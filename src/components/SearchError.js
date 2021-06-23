import React from 'react';

// IMAGES
import Derp from '../img/Derp.png'

// ----------------------------------------------------------------------------------
// ---------------------------------- SEARCH ERROR ----------------------------------
// ----------------------------------------------------------------------------------

const SearchError = ({ searchTerm }) => {
  return (
    <div className='text-center text-white'>
      <img
        className='h-1/5 w-1/5 mr-auto ml-auto'
        src={Derp}
        alt='banner for a user'
      />
      <p className='text-lg font-bold leading-6 mt-4 text-emptySearchResults'>
        Couldn't find
      </p>
      <p className='text-lg font-bold text-emptySearchResults'>"{searchTerm}"</p>
    </div>
  );
}

export default SearchError;