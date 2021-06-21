import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGameById,
  fetchGameChallenges,
  fetchGameChallengesByPopularity,
  gameSelector
} from '../features/game/gameSlice';

// ROUTING
import { useRouteMatch } from 'react-router-dom';

// COMPONENTS
import GameChallengesPage from './GameChallengesPage';

// IMAGES
import { ReactComponent as BlankUser } from '../img/BlankUser.svg';

// ----------------------------------------------------------------------------------
// ------------------------------------ GAME PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const GamePage = ({ searchTerm, refresh, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const route = useRouteMatch();
  const { game, challenges, popular_challenges } = useSelector(gameSelector);
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);
  const [filteredPopularChallenges, setFilteredPopularChallenges] = useState(challenges);

  // Grabs all necessary data from server
  useEffect(() => {
    dispatch(fetchGameById(route.params.gameId))
    dispatch(fetchGameChallenges({ gameId: route.params.gameId, userId: localStorage.getItem('id') }))
    dispatch(fetchGameChallengesByPopularity({ gameId: route.params.gameId, userId: localStorage.getItem('id') }))
  }, [dispatch, refresh])

  // Resets filter when clicking away from page
  useEffect(() => {
    setFilteredChallenges(challenges)
    setFilteredPopularChallenges(popular_challenges)
  }, [challenges, popular_challenges])

  return (
    <>
      {/* GAME INFO */}
      <div className='mb-4'>
        <div>
          <img
            className='object-cover h-72 w-full rounded-t-md'
            src={game.banner_pic_URL}
            alt='banner for a single game'
          />
        </div>
        <div className='px-0 sm:px-10 bg-profiletwo rounded-b-lg'>
          <div className='sm:flex justify-between'>
            <div className='flex justify-center items-center py-3'>
              <BlankUser className='inline-block object-fill w-12 h-12 rounded-md' />
              <h1 className='pl-5 text-3xl text-white'>{game.name}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* RENDERS GAME CHALLENGES SEARCH PAGE */}
      <div>
        <GameChallengesPage
          challenges={challenges}
          popular_challenges={popular_challenges}
          filteredChallenges={filteredChallenges}
          filteredPopularChallenges={filteredPopularChallenges}
          setFilteredChallenges={setFilteredChallenges}
          setFilteredPopularChallenges={setFilteredPopularChallenges}
          searchTerm={searchTerm}
          handleClearSearchBar={handleClearSearchBar}
        />
      </div>
    </>
  );
}

export default GamePage;