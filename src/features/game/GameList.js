import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPublicGames,
  gameSelector
} from './gameSlice';

// ROUTING
import { Link } from 'react-router-dom';

// IMAGES
import UserBannerPlaceholder from '../../img/UserBannerPlaceholder.jpg';

// COMPONENTS
import GameCard from './GameCard';
import SearchError from '../../components/SearchError';
import RequestGameModal from '../../components/utils/modals/RequestGameModal';

// ----------------------------------------------------------------------------------
// ------------------------------------ GAME LIST -----------------------------------
// ----------------------------------------------------------------------------------

const GameList = ({ searchTerm, handleClearSearchBar, refresh, setRefresh }) => {
  const dispatch = useDispatch();
  const { public_games } = useSelector(gameSelector)
  const [openGameRequest, setOpenGameRequest] = useState(false)
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(fetchPublicGames())
  }, [dispatch, refresh])

  // Game search function
  useEffect(() => {
    const results = public_games.filter(game =>
      // Accounts for accented letters
      game.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
    );
    setSearchResults(results);
  }, [searchTerm, public_games]);

  return (
    <>
      <div>
        {searchResults.length === 0 && searchTerm !== '' ? (
          <SearchError searchTerm={searchTerm} />
        ) : (
          <div className='grid justify-center gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

            {/* REQUEST GAME BUTTON */}
            {!searchTerm && localStorage.getItem('token') ? (
              <div
                className={`p-2 rounded-lg transform transition opacity-60 duration-500 hover:scale-105`}
                onClick={() => {
                  setOpenGameRequest(true)
                }}
              >
                {/* TOP IMG */}
                <div className=''>
                  <img
                    className='w-full h-48 object-cover rounded-t-lg'
                    src={UserBannerPlaceholder}
                    alt='img for a single game'
                  />
                </div>
                {/* color bar */}
                <div className={`flex justify-center px-4 py-2 text-sm text-white rounded-b-lg bg-gray-600`}>
                  <p>REQUEST A GAME</p>
                </div>
              </div>
            ) : null}

            {/* GAME LIST */}
            {searchResults.map((i) => (
              <Link
                key={i.id}
                to={`/games/${i.id}/challenges`}
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

      {/* Modals */}
      <RequestGameModal open={openGameRequest} setOpen={setOpenGameRequest} refresh={refresh} setRefresh={setRefresh} />
    </>
  );
}

export default GameList;