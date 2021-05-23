import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGameById,
  fetchGameChallenges,
  gameSelector
} from '../features/game/gameSlice';

// ROUTING
import { Link, useRouteMatch } from 'react-router-dom';

// COMPONENTS
import ChallengeList from '../features/challenge/ChallengeList';
import LoadingSpinner from './LoadSpinnser';
import ServerFailure from './ServerFailure';

// IMAGES
import { ReactComponent as BlankPublisher } from '../img/BlankPublisher.svg';

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
          <div className='mt-4 mb-4'>
            <div>
              <img
                className='object-cover h-72 w-full rounded-t-md'
                src={game.banner_pic_URL}
                alt='banner for a single game'
              />
            </div>

            {/* Info Bar */}
            <div className='px-0 sm:px-10 pt-4 pb-1 bg-green-600 rounded-b-lg'>
              {/* Game Info */}
              <div className='sm:flex justify-between'>
                {/* Left Side */}
                <div className='flex justify-center items-start'>
                  {/* {game.banner_pic_URL ? (
                    <img
                      className='rounded-lg ml-0.5 h-14 w-14 hidden sm:block'
                      src={game.banner_pic_URL}
                      alt='profile for a single ensemble'
                    />
                  ) : ( */}
                  <BlankPublisher className='inline-block object-fill w-12 h-12 rounded-md' />
                  {/* )} */}
                  <h1 className='sm:pl-5 text-3xl text-white'>{game.name}</h1>
                </div>
              </div>

              {/* Tabs */}
              <div className='flex flex-col sm:flex-row items-center sm:justify-between md:justify-start pt-2 text-xl text-white'>
                <Link to={`/`} className='mr-0 md:mr-10 hover:text-mcgreen'>HOME</Link>
                <Link to={`/`} className='mr-0 md:mr-10 hover:text-mcgreen'>PLAYLISTS</Link>
                <Link to={`/`} className='mr-0 md:mr-10 hover:text-mcgreen'>COLLECTIONS</Link>
                <Link to={`/`} className='hover:text-mcgreen'>ABOUT</Link>
                {/* {isAdmin ? (
                <Link to={`/`} className='mr0 md:ml-10 hover:text-mcgreen'>ADMIN</Link>
              ) : null} */}
              </div>
            </div>
          </div>

          {/* LIST OF GAME CHALLENGES */}
          <div>
            <ChallengeList challenges={challenges} loading={loading} error={error} searchTerm={searchTerm} handleClearSearchBar={handleClearSearchBar} />
          </div>
        </div>
      )}
    </>
  );
}

export default GamePage;