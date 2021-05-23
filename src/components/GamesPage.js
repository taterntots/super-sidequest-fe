import React from 'react';
import GameList from '../features/game/GameList.js';

// ----------------------------------------------------------------------------------
// ----------------------------------- GAMES PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const GamesPage = ({ searchTerm }) => {
  return (
    <>
      <GameList searchTerm={searchTerm} />
    </>
  );
}

export default GamesPage;