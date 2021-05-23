import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGameById,
  fetchGameChallenges,
  gameSelector
} from '../features/game/gameSlice';

// ROUTING
import { useRouteMatch } from 'react-router-dom';

// COMPONENTS
import ChallengeList from '../features/challenge/ChallengeList';
import LoadingSpinner from './LoadSpinnser';
import ServerFailure from './ServerFailure';

// ----------------------------------------------------------------------------------
// ------------------------------------ GAME PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const GamePage = ({ searchTerm, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const route = useRouteMatch();
  const { game, challenges, loading, error } = useSelector(gameSelector)

  useEffect(() => {
    dispatch(fetchGameById(route.params.gameId))
    dispatch(fetchGameChallenges(route.params.gameId))
  }, [dispatch])

  return (
    <>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : error ? (
        <ServerFailure />
      ) : (
        <div>
          <div className='text-white text-xl'>
            {game.name}
          </div>
          <ChallengeList challenges={challenges} loading={loading} error={error} searchTerm={searchTerm} handleClearSearchBar={handleClearSearchBar} />
        </div>
      )}
    </>
  );
}

export default GamePage;