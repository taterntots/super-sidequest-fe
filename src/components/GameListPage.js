import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPublicGames,
  fetchPrivateGames,
  gameSelector
} from '../features/game/gameSlice';
import {
  fetchUserAdminStatus,
  userSelector
} from '../features/user/userSlice';

// ROUTING
import { Route, Link } from 'react-router-dom';

// COMPONENTS
import GameList from '../features/game/GameList';

// ----------------------------------------------------------------------------------
// --------------------------------- GAME LIST PAGE----------------------------------
// ----------------------------------------------------------------------------------

const GameListPage = ({ searchTerm, refresh, setRefresh, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const { public_games, private_games } = useSelector(gameSelector)
  const { user_admin } = useSelector(userSelector)
  const url = window.location.href; // GRABS REFERENCE TO THE CURRENT URL TO CHECK WHICH TAB TO SELECT FOR STYLING

  useEffect(() => {
    dispatch(fetchPublicGames())
    dispatch(fetchPrivateGames())
    if (localStorage.getItem('id')) {
      dispatch(fetchUserAdminStatus(localStorage.getItem('id')))
    }
  }, [dispatch, refresh])

  return (
    <>
      {/* TAB CONTENT */}
      {user_admin && localStorage.getItem('token') ? (
        <div className='flex flex-row items-center justify-start text-xl text-white'>
          {/* PUBLIC GAMES */}
          <Link
            to={`/games`}
            onClick={() => handleClearSearchBar()}
            className={url.includes('games') && !url.includes('private') ?
              'px-5 hover:text-navbarbuttonhighlight bg-profileone rounded-t-md' :
              'px-5 hover:text-navbarbuttonhighlight bg-graybutton rounded-t-md'}
          >
            Public
          </Link>
          {/* PRIVATE GAMES */}
          <Link
            to={`/games/private`}
            onClick={() => handleClearSearchBar()}
            className={url.includes('games') && url.includes('private') ?
              'px-5 hover:text-navbarbuttonhighlight bg-profileone rounded-t-md' :
              'px-5 hover:text-navbarbuttonhighlight bg-graybutton rounded-t-md'}
          >
            Private
          </Link>
        </div>
      ) : null}

      {/* PAGE ELEMENTS BASED ON TAB */}
      <div className={user_admin && localStorage.getItem('token') ?
        'p-4 rounded-tr-md bg-profileone rounded-b-md' :
        'p-4 rounded-t-md bg-profileone rounded-b-md'}
      >
        <div className='p-4 bg-profiletwo rounded-lg'>
          <Route
            exact
            path={`/games`}
            render={(props) => (
              <GameList
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                refresh={refresh}
                setRefresh={setRefresh}
                games={public_games}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/games/private`}
            render={(props) => (
              <GameList
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                refresh={refresh}
                setRefresh={setRefresh}
                games={private_games}
                {...props}
              />
            )}
          />
        </div>
      </div>
    </>
  );
}

export default GameListPage;