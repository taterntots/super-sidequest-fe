import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGames,
  gameSelector
} from './gameSlice';

// ROUTING
import { Link } from 'react-router-dom';

// COMPONENTS
import GameCard from './GameCard';
import SearchError from '../../components/SearchError';
import LoadingSpinner from '../../components/LoadSpinnser';
import ServerFailure from '../../components/ServerFailure';

// ----------------------------------------------------------------------------------
// ------------------------------------ GAME LIST -----------------------------------
// ----------------------------------------------------------------------------------

const GameList = ({ searchTerm, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const { games, loading, error } = useSelector(gameSelector)
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(fetchGames())
  }, [dispatch])

  // Game search function
  useEffect(() => {
    const results = games.filter(game =>
      // Accounts for accented letters
      game.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
    );
    setSearchResults(results);
  }, [searchTerm, games]);

  return (
    <>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : error ? (
        <ServerFailure />
      ) : (
        <div>
          {searchResults.length === 0 && searchTerm !== '' ? (
            <SearchError searchTerm={searchTerm} />
          ) : (
            <div className='grid justify-center gap-10 grig-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
              {searchResults.map((i) => (
                <Link
                  key={i.id}
                  to={`/games/${i.id}`}
                  onClick={handleClearSearchBar}
                >
                  <GameCard
                    key={i.id}
                    data={i}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default GameList;