import React, { useState } from 'react';

// ROUTING
import { Route } from 'react-router-dom';

// COMPONENTS
import { Counter } from '../features/counter/Counter';
import { User } from '../features/user/User';
import NavBar from './NavBar';
import HomePage from '../components/HomePage';
import GamesPage from '../components/GamesPage';

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
      <div className='mx-10'>
        <Route
          exact
          path={`/`}
          render={(props) => (
            <HomePage
              {...props}
            />
          )}
        />

        <Route
          exact
          path={`/games`}
          render={(props) => (
            <GamesPage
              searchTerm={searchTerm}
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