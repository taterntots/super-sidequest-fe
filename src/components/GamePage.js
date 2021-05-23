import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGameById,
  gameSelector
} from '../features/game/gameSlice';

// ROUTING
import { Link, useRouteMatch } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// ------------------------------------ GAME PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const GamePage = ({ props, searchTerm }) => {
  const dispatch = useDispatch();
  const route = useRouteMatch();
  const { game, loading, error } = useSelector(gameSelector)

  useEffect(() => {
    dispatch(fetchGameById(route.params.gameId))
  }, [dispatch])

  console.log(game)

  return (
    <>
    <div className='text-white text-xl'>
      {game.name}
    </div>
    </>
  );
}

export default GamePage;