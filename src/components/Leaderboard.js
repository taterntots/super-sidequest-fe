import React from 'react';

// ----------------------------------------------------------------------------------
// ---------------------------------- LEADERBOARD -----------------------------------
// ----------------------------------------------------------------------------------

const Leaderboard = ({ data }) => {
  const {
    id,
    username,
    high_score
  } = data;

  return (
    <div key={id} className='flex justify-between'>
      <p>
        {username}
      </p>
      <p>
        {high_score === null ? '---' : high_score}
      </p>
    </div>
  );
};

export default Leaderboard;