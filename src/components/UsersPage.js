import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserByUsername,
  userSelector
} from '../features/user/userSlice';
import {
  fetchUserCreatedChallenges,
  fetchUserAcceptedChallenges,
  challengeSelector
} from '../features/challenge/challengeSlice';
import {
  fetchDifficulties,
  difficultySelector
} from '../features/difficulty/difficultySlice';

// ROUTING
import { Route, Link, useRouteMatch } from 'react-router-dom';

// COMPONENTS
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
  const { created_challenges, accepted_challenges, loading: challengeLoading } = useSelector(challengeSelector);
  const { difficulties, loading: difficultyLoading } = useSelector(difficultySelector);
  const [filteredCreatedChallenges, setFilteredCreatedChallenges] = useState(created_challenges);
  const [filteredAcceptedChallenges, setFilteredAcceptedChallenges] = useState(accepted_challenges);
  const [refresh, setRefresh] = useState(false)
  const route = useRouteMatch();

  // Grabs user data from the server
  useEffect(() => {
    dispatch(fetchUserByUsername(route.params.username))
    // dispatch(fetchDifficulties())
  }, [dispatch, refresh])

  // Grabs endpoints relying on userID after grabbing user in above useEffect
  useEffect(() => {
    if (Object.keys(user).length > 1) {
      dispatch(fetchUserCreatedChallenges(user.id))
      dispatch(fetchUserAcceptedChallenges(user.id))
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
      {userLoading ? (
        <LoadSpinner loading={userLoading} />
      ) : error ? (
        <ServerFailure />
      ) : (
        <div>
          <div className='mb-4'>
            <div>
              <img
                className='object-cover h-72 w-full rounded-t-md'
                src={UserBannerPlaceholder}
                alt='banner for a user'
              />
            </div>

            {/* Info Bar */}
            <div className='px-0 sm:px-10 pt-4 pb-1 bg-purplebutton rounded-b-lg'>
              {/* Game Info */}
              <div className='sm:flex justify-between'>
                {/* Left Side */}
                <div className='flex justify-center items-start'>
                  {/* {game.banner_pic_URL ? (
                    <img
                      className='rounded-lg ml-0.5 h-14 w-14 hidden sm:block'
                      src={game.banner_pic_URL}
                      alt='profile for a single ensemble'
                    />
                  ) : ( */}
                  <BlankPublisher className='inline-block object-fill w-12 h-12 rounded-md' />
                  {/* )} */}
                  <h1 className='sm:pl-5 text-3xl text-white'>{user.username}</h1>
                </div>
              </div>

              {/* FILTERS */}
              <div className='flex flex-col sm:flex-row items-center sm:justify-between md:justify-start pt-2 text-xl text-white'>
                <Link
                  to={`/${user.username}`}
                  className='mr-0 md:mr-10 hover:text-red-600'
                >
                  Profile
                </Link>
                <Link
                  to={`/${user.username}/my-challenges`}
                  className='mr-0 md:mr-10 hover:text-red-600'
                >
                  My Challenges
                </Link>
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
                </Link>
                {/* <Link onClick={filterByAll} className='mr-0 md:mr-10 hover:text-mcgreen'>ALL</Link>
                <select name='difficulty' id='difficultyBox' onChange={filterByDifficulty} className='mr-0 md:mr-10 text-black hover:text-mcgreen'>
                  <option value='Select' disabled selected>Difficulty</option>
                  {difficulties.map(difficulty => (
                    <option value={difficulty.name}>{difficulty.name}</option>
                  ))}
                </select> */}
                {user.id === localStorage.getItem('id') ? (
                  <Link
                    to={`/${localStorage.getItem('username')}/add-challenge`}
                    className={`flex items-center rounded-lg text-lg px-24 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
                  >
                    Add Challenge
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE ELEMENTS BASED ON TAB */}
      <Route
        exact
        path={`/:username/my-challenges`}
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
    </>
  );
}

export default UsersPage;