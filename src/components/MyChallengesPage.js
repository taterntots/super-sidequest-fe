import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserById,
  userSelector
} from '../features/user/userSlice';
import {
  fetchDifficulties,
  difficultySelector
} from '../features/difficulty/difficultySlice';

// ROUTING
import { Route, Link, useRouteMatch } from 'react-router-dom';

// COMPONENTS
import ChallengeList from '../features/challenge/ChallengeList';
import ChallengeForm from '../features/challenge/ChallengeForm';
import LoadSpinner from './LoadSpinner';
import ServerFailure from './ServerFailure';

// IMAGES
import { ReactComponent as BlankPublisher } from '../img/BlankPublisher.svg';
import UserBannerPlaceholder from '../img/UserBannerPlaceholder.jpg';

// ----------------------------------------------------------------------------------
// ---------------------------------- MY CHALLENGES ---------------------------------
// ----------------------------------------------------------------------------------

const MyChallengesPage = ({ searchTerm, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const route = useRouteMatch();
  const { user, loading, error } = useSelector(userSelector);
  const { difficulties, loading: difficultyLoading } = useSelector(difficultySelector);
  // const [filteredChallenges, setFilteredChallenges] = useState(challenges);

  // Grabs all necessary data from server
  useEffect(() => {
    dispatch(fetchUserById(localStorage.getItem('id')))
    // dispatch(fetchGameChallenges(route.params.gameId))
    dispatch(fetchDifficulties())
  }, [dispatch])

  // Resets filter when clicking away from page
  // useEffect(() => {
  //   setFilteredChallenges(challenges)
  // }, [challenges])

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
      {loading ? (
        <LoadSpinner loading={loading} />
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
                <Link onClick={filterByAll} className='mr-0 md:mr-10 hover:text-mcgreen'>ALL</Link>
                <select name='difficulty' id='difficultyBox' onChange={filterByDifficulty} className='mr-0 md:mr-10 text-black hover:text-mcgreen'>
                  <option value='Select' disabled selected>Difficulty</option>
                  {difficulties.map(difficulty => (
                    <option value={difficulty.name}>{difficulty.name}</option>
                  ))}
                </select>

                <Link
                  to={`/${localStorage.getItem('username')}/add-challenge`}
                  className={`flex items-center rounded-lg text-lg px-24 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
                >
                  Add Challenge
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <ChallengeList challenges={filteredChallenges} loading={loading} error={error} searchTerm={searchTerm} handleClearSearchBar={handleClearSearchBar} /> */}

      {/* PAGE ELEMENTS BASED ON TAB */}
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

export default MyChallengesPage;