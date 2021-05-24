import React, { useState } from 'react';

// ROUTING
import { Route } from 'react-router-dom';

// COMPONENTS
import { Counter } from '../features/counter/Counter';
import { User } from '../features/user/User';
import NavBar from './NavBar';
import Login from '../components/Auth/Login';
import Signup from './Auth/Signup';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';
import HomePage from '../components/HomePage';
import GameList from '../features/game/GameList';
import GamePage from '../components/GamePage';
import SignUpAndLoginRoute from '../components/utils/SignUpAndLoginRoute';

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

        <SignUpAndLoginRoute path={'/login'} handleClearSearchBar={handleClearSearchBar} component={Login} />
        <SignUpAndLoginRoute path={'/signup'} handleClearSearchBar={handleClearSearchBar} component={Signup} />
        <SignUpAndLoginRoute path={'/forgot-password'} handleClearSearchBar={handleClearSearchBar} component={ForgotPassword} />
        <SignUpAndLoginRoute path={'/reset-password'} handleClearSearchBar={handleClearSearchBar} component={ResetPassword} />

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