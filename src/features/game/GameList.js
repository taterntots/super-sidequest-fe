import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGames,
  gameSelector
} from './gameSlice';

// ROUTING
import { Link, useRouteMatch } from 'react-router-dom';

// COMPONENTS
import GameCard from './GameCard';

// ----------------------------------------------------------------------------------
// ------------------------------------ GAME LIST -----------------------------------
// ----------------------------------------------------------------------------------

const GameList = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
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
      {searchResults.length === 0 && searchTerm !== '' ? (
        <div className='flex flex-col items-center justify-center p-16 '>
          <p className='text-lg font-bold leading-6 text-emptySearchResults'>
            Couldn't find
        </p>
          <p className='text-lg font-bold text-emptySearchResults'>"{searchTerm}"</p>
          <p className='text-sm text-center text-white'>
            Try searching again using a different spelling or keyword.
        </p>
        </div>
      ) : (
        <div className='grid justify-center gap-10 mt-2 grig-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
          {searchResults.map((i) => (
            <Link
              key={i.id}
              to={`${url}/${i.id}`}
            >
              <GameCard
                key={i.id}
                data={i}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default GameList;