import React from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// COMPONENTS
import ChallengeCard from './ChallengeCard';

// ----------------------------------------------------------------------------------
// --------------------------------- CHALLENGE LIST ---------------------------------
// ----------------------------------------------------------------------------------

const ChallengeList = ({ challenges, loading, error }) => {

  // Error handling & map successful query data 
  const renderChallenges = () => {
    if (loading) return <p>Loading challenges...</p>
    if (error) return <p>Cannot display challenges...</p>
    return challenges.map(challenge =>
      <div key={challenge.id} className='tile'>
        <h2>{challenge.game_title}</h2>
      </div>
    )
  }

  return (
    <>
      {/* {chunks.length === 0 && searchTerm !== '' ? (
        <div className='flex flex-col items-center justify-center p-16 '>
          <p className='text-lg font-bold leading-6 text-emptySearchResults'>
            Couldn't find
        </p>
          <p className='text-lg font-bold text-emptySearchResults'>"{searchTerm}"</p>
          <p className='text-sm text-center text-white'>
            Try searching again using a different spelling or keyword.
        </p>
        </div>
      ) : ( */}
      <div className='grid justify-center gap-10 mt-2 grig-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 2xl:px-15'>
        {challenges.map((i) => (
          <Link
            key={i.challenge_id}
          // to={`${match.url}/${i.id}`}
          >
            <ChallengeCard
              key={i.challenge_id}
              data={i}
            />
          </Link>
        ))}
      </div>
      {/* )} */}
    </>
  );
}

export default ChallengeList;