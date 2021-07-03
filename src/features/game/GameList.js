import React, { useState, useEffect } from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// IMAGES
import MultiplayerImage from '../../img/Multiplayer.png';

// COMPONENTS
import GameCard from './GameCard';
import SearchError from '../../components/SearchError';
import RequestGameModal from '../../components/utils/modals/RequestGameModal';

// ----------------------------------------------------------------------------------
// ------------------------------------ GAME LIST -----------------------------------
// ----------------------------------------------------------------------------------

const GameList = ({ searchTerm, handleClearSearchBar, refresh, setRefresh, games }) => {
  const [openGameRequest, setOpenGameRequest] = useState(false)
  const [searchResults, setSearchResults] = useState([]);
  const url = window.location.href; // GRABS REFERENCE TO THE CURRENT URL

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
      <div>
        {searchResults.length === 0 && searchTerm !== '' ? (
          <SearchError searchTerm={searchTerm} />
        ) : (
          <div className='grid justify-center gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

            {/* REQUEST GAME BUTTON */}
            {!searchTerm && localStorage.getItem('token') && !url.includes('private') ? (
              <div
                className={`p-2 rounded-lg transform transition opacity-60 cursor-pointer duration-500 hover:scale-105`}
                onClick={() => {
                  setOpenGameRequest(true)
                }}
              >
                {/* TOP IMG */}
                <div className=''>
                  <img
                    className='w-full h-48 object-cover bg-gray-300 rounded-t-lg'
                    src={MultiplayerImage}
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