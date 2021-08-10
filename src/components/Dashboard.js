import React, { useState } from 'react';

// ROUTING
import { Route, Switch } from 'react-router-dom';

// COMPONENTS
import NavBar from './NavBar';
import Footer from './Footer';
import ResetPassword from './Auth/ResetPassword';
import HomePage from './HomePage';
import UserPage from './UserPage';
import GameListPage from './GameListPage';
import UserListPage from './UserListPage';
import AdminRoute from './utils/routes/AdminRoute';
import UserRoute from './utils/routes/UserRoute';
import BannedUserPage from './utils/BannedUserPage';
import GameDetails from './GameDetails';
import AllChallengeDetails from './AllChallengeDetails';
import SupportUsPage from './pages/SupportUsPage';
import AboutUsPage from './pages/AboutUsPage';
import FAQPage from './pages/FAQPage';
import TermsPage from './pages/TermsPage';
import ContactUsPage from './pages/ContactUsPage';

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
      <div className='mx-0 lg:mx-10 my-3'>
        <Switch>
          <Route
            exact
            path={`/`}
            render={(props) => (
              <HomePage
                searchTerm={searchTerm}
                refresh={refresh}
                setRefresh={setRefresh}
                handleClearSearchBar={handleClearSearchBar}
                {...props}
              />
            )}
          />
          <Route path={'/reset-password'} handleClearSearchBar={handleClearSearchBar} component={ResetPassword} />
          <Route
            exact
            path={`/users`}
            render={(props) => (
              <UserListPage
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                refresh={refresh}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/users/banned`}
            render={(props) => (
              <UserListPage
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                refresh={refresh}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/users/leaderboard`}
            render={(props) => (
              <UserListPage
                searchTerm={searchTerm}
                handleClearSearchBar={handleClearSearchBar}
                refresh={refresh}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/games`}
            render={(props) => (
              <GameListPage
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
              <GameListPage
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
            path={`/games/:gameId/leaderboard`}
            render={(props) => (
              <GameDetails
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
            path={`/challenges/all`}
            render={(props) => (
              <AllChallengeDetails
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
                refresh={refresh}
                setRefresh={setRefresh}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/about`}
            render={(props) => (
              <AboutUsPage
                refresh={refresh}
                setRefresh={setRefresh}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/faq`}
            render={(props) => (
              <FAQPage
                refresh={refresh}
                setRefresh={setRefresh}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/terms`}
            render={(props) => (
              <TermsPage
                refresh={refresh}
                setRefresh={setRefresh}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`/contact`}
            render={(props) => (
              <ContactUsPage
                refresh={refresh}
                setRefresh={setRefresh}
                {...props}
              />
            )}
          />
          <Route
            path={`/banned`}
            render={(props) => (
              <BannedUserPage
                {...props}
              />
            )}
          />
          <UserRoute
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