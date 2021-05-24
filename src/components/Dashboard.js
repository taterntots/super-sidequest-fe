import React, { useState } from 'react';

// ROUTING
import { Route } from 'react-router-dom';

// COMPONENTS
import { Counter } from '../features/counter/Counter';
import { User } from '../features/user/User';
import NavBar from './NavBar';
import Login from '../components/Auth/Login';
import HomePage from '../components/HomePage';
import GameList from '../features/game/GameList';
import GamePage from '../components/GamePage';

// ----------------------------------------------------------------------------------
// ---------------------------------- DASHBOARD -------------------------------------
// ----------------------------------------------------------------------------------

const Dashboard = () => {
  // State
  const [searchTerm, setSearchTerm] = useState('');

  // Function for handling search input
  const handleInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  // Function for clearing search bar terms when clicking elsewhere
  const handleClearSearchBar = () => {
    setSearchTerm('');
    document.getElementById('searchBar').value = ''
  };

  return (
    <>
      <NavBar handleClearSearchBar={handleClearSearchBar} handleInputChange={handleInputChange} />
      <div className='mx-10 my-3'>
        <Route
          exact
          path={`/`}
          render={(props) => (
            <HomePage
              searchTerm={searchTerm}
              handleClearSearchBar={handleClearSearchBar}
              {...props}
            />
          )}
        />

        <Route
          exact
          path={`/login`}
          render={(props) => (
            <Login
              handleClearSearchBar={handleClearSearchBar}
              {...props}
            />
          )}
        />

        <Route
          exact
          path={`/games`}
          render={(props) => (
            <GameList
              searchTerm={searchTerm}
              handleClearSearchBar={handleClearSearchBar}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`/games/:gameId`}
          render={(props) => (
            <GamePage
              searchTerm={searchTerm}
              handleClearSearchBar={handleClearSearchBar}
              {...props}
            />
          )}
        />

        <Route
          exact
          path={`/counter`}
          render={(props) => (
            <Counter
              {...props}
            />
          )}
        />

        <Route
          exact
          path={`/support`}
          render={(props) => (
            <User
              {...props}
            />
          )}
        />
      </div>
    </>
  );
}

export default Dashboard;