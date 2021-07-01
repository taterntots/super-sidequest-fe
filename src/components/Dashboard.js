import React, { useState } from 'react';

// ROUTING
import { Route, Switch } from 'react-router-dom';

// COMPONENTS
import NavBar from './NavBar';
import Footer from './Footer';
import ResetPassword from './Auth/ResetPassword';
import HomePage from '../components/HomePage';
import UserPage from '../components/UserPage';
import GamePage from '../components/GamePage';
import AdminRoute from '../components/utils/routes/AdminRoute';
import GameDetails from '../components/GameDetails';
import SupportUsPage from '../components/pages/SupportUsPage';
import AboutUsPage from '../components/pages/AboutUsPage';

// ----------------------------------------------------------------------------------
// ---------------------------------- DASHBOARD -------------------------------------
// ----------------------------------------------------------------------------------

const Dashboard = () => {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false)

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
      {/* NAVBAR */}
      <NavBar
        refresh={refresh}
        setRefresh={setRefresh}
        handleClearSearchBar={handleClearSearchBar}
        handleInputChange={handleInputChange}
      />

      {/* BODY */}
      <div className='mx-10 my-3'>
        <Switch>
          <Route
            exact
            path={`/`}
            render={(props) => (
              <HomePage
                searchTerm={searchTerm}
                refresh={refresh}
                handleClearSearchBar={handleClearSearchBar}
                {...props}
              />
            )}
          />
          <Route path={'/reset-password'} handleClearSearchBar={handleClearSearchBar} component={ResetPassword} />
          <Route
            exact
            path={`/games`}
            render={(props) => (
              <GamePage
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                refresh={refresh}
                setRefresh={setRefresh}
                {...props}
              />
            )}
          />
          <AdminRoute
            exact
            path={`/games/private`}
            render={(props) => (
              <GamePage
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                refresh={refresh}
                setRefresh={setRefresh}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/games/:gameId/challenges`}
            render={(props) => (
              <GameDetails
                searchTerm={searchTerm}
                refresh={refresh}
                setRefresh={setRefresh}
                handleClearSearchBar={handleClearSearchBar}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/support`}
            render={(props) => (
              <SupportUsPage
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/about`}
            render={(props) => (
              <AboutUsPage
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/faq`}
            render={(props) => (
              <SupportUsPage
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/terms`}
            render={(props) => (
              <SupportUsPage
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/contact`}
            render={(props) => (
              <SupportUsPage
                {...props}
              />
            )}
          />
          <Route
            path={`/:username`}
            render={(props) => (
              <UserPage
                searchTerm={searchTerm}
                refresh={refresh}
                setRefresh={setRefresh}
                handleClearSearchBar={handleClearSearchBar}
                {...props}
              />
            )}
          />
        </Switch>
      </div>

      {/* FOOTER */}
      <Footer handleClearSearchBar={handleClearSearchBar} />
    </>
  );
}

export default Dashboard;