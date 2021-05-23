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

// ----------------------------------------------------------------------------------
// ------------------------------------ GAME PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const GamePage = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const route = useRouteMatch();
  const { game, challenges, loading, error } = useSelector(gameSelector)

  useEffect(() => {
    dispatch(fetchGameById(route.params.gameId))
    dispatch(fetchGameChallenges(route.params.gameId))
  }, [dispatch])

  return (
    <>
      <div className='text-white text-xl'>
        {game.name}
      </div>
      <ChallengeList challenges={challenges} loading={loading} error={error} />
    </>
  );
}

export default GamePage;