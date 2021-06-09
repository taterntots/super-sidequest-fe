import React, { useState, useEffect } from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// COMPONENTS
import ChallengeCard2 from './ChallengeCard2';
import SearchError from '../../components/SearchError';

// ----------------------------------------------------------------------------------
// --------------------------------- CHALLENGE LIST ---------------------------------
// ----------------------------------------------------------------------------------

const ChallengeList = ({ challenges, searchTerm, handleClearSearchBar }) => {
  const [searchResults, setSearchResults] = useState([]);

  // Challenge search function
  useEffect(() => {
    const results = challenges.filter(challenge =>
      // Accounts for accented letters
      challenge.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
    );
    setSearchResults(results);
  }, [searchTerm, challenges]);

  return (
    <>
      {searchResults.length === 0 && searchTerm !== '' ? (
        <SearchError searchTerm={searchTerm} />
      ) : (
        <div className='grid gap-6 grig-cols-1 2xl:grid-cols-2'>
          {searchResults.map((i) => (
            <Link
              key={i.challenge_id}
              to={`/${i.username}/challenges/${i.challenge_id}`}
              onClick={handleClearSearchBar}
            >
              <ChallengeCard2
                key={i.challenge_id}
                data={i}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default ChallengeList;