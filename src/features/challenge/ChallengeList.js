import React, { useState, useEffect } from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// COMPONENTS
import ChallengeCard from './ChallengeCard';
import SearchError from '../../components/SearchError';

// ----------------------------------------------------------------------------------
// --------------------------------- CHALLENGE LIST ---------------------------------
// ----------------------------------------------------------------------------------

const ChallengeList = ({ challenges, searchTerm, handleClearSearchBar, user }) => {
  const [searchResults, setSearchResults] = useState([]);

  // Challenge search function
  useEffect(() => {
    const results = challenges.filter(challenge =>
      // Accounts for accented letters
      challenge.game_title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) ||
      challenge.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) ||
      challenge.username.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) ||
      challenge.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
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
              <ChallengeCard
                key={i.challenge_id}
                data={i}
                user={user}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default ChallengeList;