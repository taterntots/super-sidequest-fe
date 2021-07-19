import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGameById,
  fetchGameChallenges,
  fetchGameChallengesByPopularity,
  fetchGameChallengesByExpiration,
  deleteGame,
  updateGame,
  gameSelector
} from '../features/game/gameSlice';
import {
  fetchUserAdminStatus,
  fetchUserEXPForGameById,
  userSelector
} from '../features/user/userSlice';

// ROUTING
import { useRouteMatch, useHistory } from 'react-router-dom';

// COMPONENTS
import GameChallengeSearchPage from './GameChallengeSearchPage';
import EditGameModal from './utils/modals/EditGameModal';
import DeleteGameModal from './utils/modals/DeleteGameModal';
import Level from './utils/Level';

// IMAGES
import { ReactComponent as BlankUser } from '../img/BlankUser.svg';

// ----------------------------------------------------------------------------------
// ----------------------------------- GAME DETAILS ---------------------------------
// ----------------------------------------------------------------------------------

const GameDetails = ({ searchTerm, refresh, setRefresh, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const route = useRouteMatch();
  const { game, challenges, popular_challenges, expire_challenges, loading } = useSelector(gameSelector);
  const { user_admin, user_game_experience_points } = useSelector(userSelector)
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);
  const [filteredPopularChallenges, setFilteredPopularChallenges] = useState(challenges);
  const [filteredExpireChallenges, setFilteredExpireChallenges] = useState(challenges);
  const [openGameEdit, setOpenGameEdit] = useState(false);
  const [openGameDelete, setOpenGameDelete] = useState(false);

  // Grabs all necessary data from server
  useEffect(() => {
    dispatch(fetchGameById(route.params.gameId))
    dispatch(fetchGameChallenges(route.params.gameId))
    dispatch(fetchGameChallengesByPopularity(route.params.gameId))
    dispatch(fetchGameChallengesByExpiration(route.params.gameId))
    if (localStorage.getItem('id')) {
      dispatch(fetchUserAdminStatus(localStorage.getItem('id')))
      dispatch(fetchUserEXPForGameById(route.params.gameId))
    }
  }, [dispatch, refresh])

  // Resets filter when clicking away from page
  useEffect(() => {
    setFilteredChallenges(challenges)
    setFilteredPopularChallenges(popular_challenges)
    setFilteredExpireChallenges(expire_challenges)
  }, [challenges, popular_challenges, expire_challenges])

  // Function to handle submitting changes/edits to a game
  const submitGameEdit = async (data) => {
    data.game_id = route.params.gameId

    dispatch(updateGame(data))
      .then(res => {
        if (res.payload) {
          setRefresh(!refresh)
          setOpenGameEdit(false)
        } else {
          setRefresh(!refresh)
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  // Function to handle deleting a game
  const submitGameDelete = async () => {
    dispatch(deleteGame(route.params.gameId))
      .then(res => {
        history.push(`/games`)
        setOpenGameDelete(false);
        setRefresh(!refresh)
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <>
      {/* GAME INFO */}
      <div className='mb-4'>
        <div
          className={user_admin && localStorage.getItem('token') ?
            'hover:opacity-50 cursor-pointer transform transition' :
            ''
          }
          onClick={() => user_admin && localStorage.getItem('token') ? setOpenGameEdit(true) : null}
        >
          {user_admin && localStorage.getItem('token') ? (
            <p className='opacity-0 hover:opacity-100 absolute text-5xl font-bold text-white flex justify-center items-center bottom-0 top-0 right-0 left-0'>
              EDIT
            </p>
          ) : null}
          <img
            className='object-cover h-72 w-full rounded-t-md'
            src={game.banner_pic_URL}
            alt='banner for a single game'
          />
        </div>


        <div className='px-10 bg-profileone rounded-b-lg'>
          <div className='flex justify-center sm:justify-between py-3'>

            {/* Game Pic and Name Container */}
            <div className='flex'>
              {game.game_pic_URL ? (
                <img
                  src={game.game_pic_URL}
                  className={localStorage.getItem('id') ?
                    'hidden sm:inline object-fill w-20 h-20 rounded-md' :
                    'object-fill w-20 h-20 rounded-md'}
                  alt='game avatar'
                >
                </img>
              ) : (
                <BlankUser
                  className={localStorage.getItem('id') ?
                    'hidden sm:inline object-fill w-20 h-20 rounded-md' :
                    'object-fill w-20 h-20 rounded-md'}
                  alt='placeholder for game avatar'
                />
              )}
              <div
                className={localStorage.getItem('id') ?
                  'inline sm:hidden self-center' :
                  'hidden'}
              >
                <Level user_experience_points={user_game_experience_points} user={{ profile_color_two: null }} />
              </div>

              {/* Name */}
              <div className='self-center text-center ml-3'>
                <h1 className='pb-2 px-2 text-2xl sm:text-4xl text-white'>{game.name}</h1>
              </div>
            </div>

            {/* LEVEL UP ICON */}
            <div className={localStorage.getItem('id') ?
              'hidden sm:inline' :
              'hidden'}
            >
              <Level user_experience_points={user_game_experience_points} user={{ profile_color_two: null }} />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditGameModal open={openGameEdit} setOpen={setOpenGameEdit} setOpenDelete={setOpenGameDelete} submitGameEdit={submitGameEdit} loading={loading} game={game} />
      <DeleteGameModal open={openGameDelete} setOpen={setOpenGameDelete} submitGameDelete={submitGameDelete} loading={loading} />

      {/* RENDERS GAME CHALLENGES SEARCH PAGE */}
      <div>
        <GameChallengeSearchPage
          challenges={challenges}
          popular_challenges={popular_challenges}
          expire_challenges={expire_challenges}
          filteredChallenges={filteredChallenges}
          filteredPopularChallenges={filteredPopularChallenges}
          filteredExpireChallenges={filteredExpireChallenges}
          setFilteredChallenges={setFilteredChallenges}
          setFilteredPopularChallenges={setFilteredPopularChallenges}
          setFilteredExpireChallenges={setFilteredExpireChallenges}
          searchTerm={searchTerm}
          handleClearSearchBar={handleClearSearchBar}
        />
      </div>
    </>
  );
}

export default GameDetails;