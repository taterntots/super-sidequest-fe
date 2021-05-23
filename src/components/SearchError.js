import React from 'react';

// ----------------------------------------------------------------------------------
// ---------------------------------- SEARCH ERROR ----------------------------------
// ----------------------------------------------------------------------------------

const SearchError = ({ searchTerm }) => {
  return (
    <div className='flex flex-col items-center justify-center p-16 '>
      <p className='text-lg font-bold leading-6 text-emptySearchResults'>
        Couldn't find
      </p>
      <p className='text-lg font-bold text-emptySearchResults'>"{searchTerm}"</p>
      <p className='text-sm text-center text-white'>
        Try searching again using a different spelling or keyword.
      </p>
    </div>
  );
}

export default SearchError;