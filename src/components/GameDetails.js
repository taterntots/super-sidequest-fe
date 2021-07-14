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
  userSelector
} from '../features/user/userSlice';

// ROUTING
import { useRouteMatch, useHistory } from 'react-router-dom';

// COMPONENTS
import GameChallengeSearchPage from './GameChallengeSearchPage';
import EditGameModal from './utils/modals/EditGameModal';
import DeleteGameModal from './utils/modals/DeleteGameModal';

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
  const { user_admin } = useSelector(userSelector)
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
      <div
        className={user_admin && localStorage.getItem('token') ?
          'mb-4 hover:opacity-50 cursor-pointer transform transition' :
          'mb-4'
        }
        onClick={() => user_admin && localStorage.getItem('token') ? setOpenGameEdit(true) : null}
      >
        {user_admin && localStorage.getItem('token') ? (
          <p className='opacity-0 hover:opacity-100 absolute text-5xl font-bold text-white flex justify-center items-center bottom-0 top-0 right-0 left-0'>
            EDIT
          </p>
        ) : null}
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
              {game.game_pic_URL ? (
                <img
                  className='inline-block object-fill w-12 h-12 rounded-md'
                  alt='game avatar'
                  src={game.game_pic_URL}
                />
              ) : (
                <BlankUser className='inline-block object-fill w-12 h-12 rounded-md' />
              )}
              <h1 className='pl-5 text-3xl text-white'>{game.name}</h1>
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