import React from 'react';

// ----------------------------------------------------------------------------------
// ---------------------------------- LOAD SPINNER ----------------------------------
// ----------------------------------------------------------------------------------

const ServerFailure = () => {
  return (
    <div className='text-center mt-10 text-white text-3xl'>
      <h2>
        Failed to connect to the server
      </h2>
      <h3 className='mt-3 text-6xl'>
        :(
      </h3>
    </div>
  );
}

export default ServerFailure;