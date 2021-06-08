import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserByUsername,
  userSelector
} from '../features/user/userSlice';
import {
  fetchUserCreatedChallenges,
  fetchUserAcceptedChallenges,
  fetchUserCompletedChallengeTotal,
  fetchUserFeaturedChallenge,
  challengeSelector
} from '../features/challenge/challengeSlice';
import {
  fetchDifficulties,
  difficultySelector
} from '../features/difficulty/difficultySlice';

// ROUTING
import { Route, Link, useRouteMatch } from 'react-router-dom';

// COMPONENTS
import ProfilePage from './ProfilePage';
import ChallengeList from '../features/challenge/ChallengeList';
import ChallengeDetails from '../features/challenge/ChallengeDetails';
import ChallengeForm from '../features/challenge/ChallengeForm';
import LoadSpinner from './LoadSpinner';
import ServerFailure from './ServerFailure';

// IMAGES
import { ReactComponent as BlankPublisher } from '../img/BlankPublisher.svg';
import UserBannerPlaceholder from '../img/UserBannerPlaceholder.jpg';

// ----------------------------------------------------------------------------------
// ----------------------------------- USERS PAGE------------------------------------
// ----------------------------------------------------------------------------------

const UsersPage = ({ searchTerm, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const { user, loading: userLoading, error } = useSelector(userSelector);
  const { created_challenges, accepted_challenges, challenge_game_stats, featured_challenge, loading: challengeLoading } = useSelector(challengeSelector);
  const { difficulties, loading: difficultyLoading } = useSelector(difficultySelector);
  const [filteredCreatedChallenges, setFilteredCreatedChallenges] = useState(created_challenges);
  const [filteredAcceptedChallenges, setFilteredAcceptedChallenges] = useState(accepted_challenges);
  const [refresh, setRefresh] = useState(false)
  const url = window.location.href; // GRABS REFERENCE TO THE CURRENT URL TO CHECK WHICH TAB TO SELECT FOR STYLING
  const route = useRouteMatch();

  // Grabs user data from the server
  useEffect(() => {
    dispatch(fetchUserByUsername(route.params.username))
    // dispatch(fetchDifficulties())
  }, [dispatch, refresh, route.params.username])

  // Grabs endpoints relying on userID after grabbing user in above useEffect
  useEffect(() => {
    if (Object.keys(user).length > 1) {
      dispatch(fetchUserCreatedChallenges(user.id))
      dispatch(fetchUserAcceptedChallenges(user.id))
      dispatch(fetchUserCompletedChallengeTotal(user.id))
      dispatch(fetchUserFeaturedChallenge(user.id))
    }
  }, [dispatch, user, refresh])

  // Resets filter when clicking away from page
  useEffect(() => {
    setFilteredCreatedChallenges(created_challenges)
    setFilteredAcceptedChallenges(accepted_challenges)
  }, [created_challenges, accepted_challenges])

  // Filter all challenges
  const filterByAll = () => {
    // setFilteredChallenges(challenges)
    // var selectBox = document.getElementById("difficultyBox");
    // selectBox.selectedIndex = 0;
  }

  // Filter by difficulty
  const filterByDifficulty = () => {
    // var selectBox = document.getElementById("difficultyBox");
    // var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    // var filtered = challenges.filter(fc => fc.difficulty === selectedValue)
    // setFilteredChallenges(filtered)
  }

  return (
    <>
      {/* USER INFO */}
      <div className='mb-4'>
        <div>
          <img
            className='object-cover h-72 w-full rounded-t-md'
            src={UserBannerPlaceholder}
            alt='banner for a user'
          />
        </div>

        {/* Info Bar */}
        <div className='px-0 sm:px-10 bg-profiletwo rounded-b-lg'>
          <div className='sm:flex justify-between'>
            <div className='flex justify-center items-center py-3'>
              <BlankPublisher className='inline-block object-fill w-12 h-12 rounded-md' />
              <h1 className='pl-5 text-3xl text-white'>{user.username}</h1>
            </div>
          </div>

          {/* FILTERS */}
          {/* <div className='flex flex-col sm:flex-row items-center sm:justify-between md:justify-start pt-2 text-xl text-white'>
                <Link
                  to={`/${user.username}/accepted`}
                  className='mr-0 md:mr-10 hover:text-red-600'
                >
                  Accepted
                </Link>
                <Link
                  to={`/${user.username}/completed`}
                  className='mr-0 md:mr-10 hover:text-red-600'
                >
                  Completed
                </Link> */}
          {/* <Link onClick={filterByAll} className='mr-0 md:mr-10 hover:text-mcgreen'>ALL</Link>
                <select name='difficulty' id='difficultyBox' onChange={filterByDifficulty} className='mr-0 md:mr-10 text-black hover:text-mcgreen'>
                  <option value='Select' disabled selected>Difficulty</option>
                  {difficulties.map(difficulty => (
                    <option value={difficulty.name}>{difficulty.name}</option>
                  ))}
                </select> */}
          {/* </div> */}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className='flex flex-col sm:flex-row items-center sm:justify-between md:justify-start text-xl text-white'>
        <Link
          to={`/${user.username}`}
          className={!url.includes('challenges') && !url.includes('add-challenge') ?
            "md:px-5 hover:text-red-600 bg-profiletwo rounded-t-md" :
            "md:px-5 hover:text-red-600 bg-gray-700 rounded-t-md"}
        >
          Profile
          </Link>
        <Link
          to={`/${user.username}/challenges`}
          className={url.includes('challenges') ?
            "md:px-5 hover:text-red-600 bg-profiletwo rounded-t-md" :
            "md:px-5 hover:text-red-600 bg-gray-700 rounded-t-md"}
        >
          Challenges
          </Link>
        {user.id === localStorage.getItem('id') ? (
          <Link
            to={`/${localStorage.getItem('username')}/add-challenge`}
            className={url.includes('add-challenge') ?
              "md:px-5 hover:text-red-600 bg-profiletwo rounded-t-md" :
              "md:px-5 hover:text-red-600 bg-profileone rounded-t-md"}
          >
            +
          </Link>
        ) : null}
        {/* <Link
            to={`/${user.username}/accepted`}
            className='md:px-5 pb-1 hover:text-red-600'
          >
            Accepted
                </Link>
          <Link
            to={`/${user.username}/completed`}
            className='md:px-5 pb-1 hover:text-red-600'
          >
            Completed
          </Link> */}
      </div>

      {/* PAGE ELEMENTS BASED ON TAB */}
      <div className='p-4 bg-profiletwo rounded-tr-md rounded-b-md'>
        <Route
          exact
          path={`/:username`}
          render={(props) => (
            <ProfilePage
              acceptedChallenges={filteredAcceptedChallenges}
              challenge_game_stats={challenge_game_stats}
              featured_challenge={featured_challenge}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`/:username/challenges`}
          render={(props) => (
            <ChallengeList
              challenges={filteredCreatedChallenges}
              loading={challengeLoading}
              searchTerm={searchTerm}
              handleClearSearchBar={handleClearSearchBar}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`/:username/accepted`}
          render={(props) => (
            <ChallengeList
              challenges={filteredAcceptedChallenges}
              loading={challengeLoading}
              searchTerm={searchTerm}
              handleClearSearchBar={handleClearSearchBar}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`/:username/challenges/:challengeId`}
          render={(props) => (
            <ChallengeDetails
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
          path={`/:username/add-challenge`}
          render={(props) => (
            <ChallengeForm
              searchTerm={searchTerm}
              handleClearSearchBar={handleClearSearchBar}
              {...props}
            />
          )}
        />
      </div>
    </>
  );
}

export default UsersPage;