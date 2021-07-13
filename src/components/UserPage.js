import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserByUsername,
  updateUser,
  userSelector
} from '../features/user/userSlice';
import {
  fetchUserCreatedChallenges,
  fetchUserAcceptedChallenges,
  fetchUserCompletedChallenges,
  fetchUserCompletedChallengeTotal,
  fetchUserFeaturedChallenge,
  challengeSelector
} from '../features/challenge/challengeSlice';

// ROUTING
import { Route, Link, useRouteMatch, useLocation } from 'react-router-dom';

// UTILS
import queryString from 'query-string';

// STYLING
import styled from '@emotion/styled';

// COMPONENTS
import ProfilePage from './ProfilePage';
import ChallengesSearchPage from './ChallengesSearchPage';
import ChallengeDetails from '../features/challenge/ChallengeDetails';
import ChallengeForm from '../features/challenge/ChallengeForm';
import EditUserProfileModal from './utils/modals/EditUserProfileModal';

// IMAGES
import { ReactComponent as BlankUser } from '../img/BlankUser.svg';
import UserBannerPlaceholder from '../img/UserBannerPlaceholder.jpg';

// ----------------------------------------------------------------------------------
// ----------------------------------- USER PAGE-------------------------------------
// ----------------------------------------------------------------------------------

const UserPage = ({ searchTerm, refresh, setRefresh, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(userSelector);
  const { created_challenges, accepted_challenges, completed_challenges, challenge_game_stats, featured_challenge } = useSelector(challengeSelector);
  const [filteredCreatedChallenges, setFilteredCreatedChallenges] = useState(created_challenges);
  const [filteredAcceptedChallenges, setFilteredAcceptedChallenges] = useState(accepted_challenges);
  const [filteredCompletedChallenges, setFilteredCompletedChallenges] = useState(completed_challenges);
  const [currentGame, setCurrentGame] = useState({})
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const url = window.location.href; // GRABS REFERENCE TO THE CURRENT URL TO CHECK WHICH TAB TO SELECT FOR STYLING
  const route = useRouteMatch();
  const location = useLocation();

  // Grabs user data from the server
  useEffect(() => {
    dispatch(fetchUserByUsername(route.params.username))
  }, [dispatch, refresh, route.params.username])

  // Sets game filter if exists in URL
  useEffect(() => {
    if (location.search) {
      setCurrentGame(queryString.parse(location.search))
    } else {
      setCurrentGame({ game: 'All' })
    }
  }, [refresh, location.search])

  // Grabs endpoints relying on userID after grabbing user in above useEffect
  useEffect(() => {
    if (Object.keys(user).length > 1) {
      dispatch(fetchUserCreatedChallenges(user.id))
      dispatch(fetchUserAcceptedChallenges(user.id))
      dispatch(fetchUserCompletedChallenges(user.id))
      dispatch(fetchUserCompletedChallengeTotal(user.id))
      dispatch(fetchUserFeaturedChallenge(user.id))
    }
  }, [dispatch, user, refresh])

  // Resets filter when clicking away from page
  useEffect(() => {
    if (currentGame.game !== 'All') {
      setFilteredCreatedChallenges(created_challenges.filter(crc => crc.game_title === currentGame.game))
      setFilteredAcceptedChallenges(accepted_challenges.filter(ac => ac.game_title === currentGame.game))
      setFilteredCompletedChallenges(completed_challenges.filter(coc => coc.game_title === currentGame.game))
    } else {
      setFilteredCreatedChallenges(created_challenges)
      setFilteredAcceptedChallenges(accepted_challenges)
      setFilteredCompletedChallenges(completed_challenges)
    }
  }, [currentGame, created_challenges, accepted_challenges, completed_challenges])

  // Function to handle submitting changes to the user's profile
  const submitUserProfile = async (data) => {
    dispatch(updateUser(data))
      .then(res => {
        setOpenProfileEdit(false)
        setRefresh(!refresh)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const ProfileOne = styled.div`
    background-color: ${user.profile_color_one ? user.profile_color_one : null};
  `
  const ProfileTwo = styled.div`
    background-color: ${user.profile_color_two ? user.profile_color_two : null};
  `
  const ProfileTwoForm = styled.form`
    background-color: ${user.profile_color_two ? user.profile_color_two : null};
  `
  const ProfileOneButton = styled.button`
    background-color: ${user.profile_color_one ? user.profile_color_one : null};
  `

  return (
    <>
      {/* USER INFO */}
      <div
        className={localStorage.getItem('id') === user.id ?
          'mb-4 hover:opacity-50 cursor-pointer transform transition' :
          'mb-4'
        }
        onClick={() => localStorage.getItem('id') === user.id ? setOpenProfileEdit(true) : null}
      >
        {localStorage.getItem('id') === user.id ? (
          <p className='opacity-0 hover:opacity-100 absolute text-5xl font-bold text-white flex justify-center items-center bottom-0 top-0 right-0 left-0'>
            EDIT
          </p>
        ) : null}
        <div>
          <img
            className='object-cover h-72 w-full rounded-t-md'
            src={user.banner_pic_URL ? user.banner_pic_URL : UserBannerPlaceholder}
            alt='banner for a user'
          />
        </div>

        <ProfileOne className={`px-0 sm:px-10 bg-profileone rounded-b-lg`}>
          <div className='sm:flex justify-between'>
            <div className='flex justify-center items-center py-3'>
              {user.profile_pic_URL ? (
                <img
                  src={user.profile_pic_URL}
                  className='inline-block object-fill w-12 h-12 rounded-md'
                  alt='user avatar'
                >
                </img>
              ) : (
                <BlankUser
                  className='inline-block object-fill w-12 h-12 rounded-md'
                  alt='placeholder for user avatar'
                />
              )}
              <h1 className='pl-5 text-3xl text-white'>{user.username}</h1>
            </div>
          </div>
        </ProfileOne>
      </div>

      {/* TAB CONTENT */}
      <div className='flex flex-row items-center justify-start text-xl text-white'>
        {/* PROFILE */}
        {!url.includes('challenges') && !url.includes('add-challenge') ? (
          <ProfileOne className={'bg-profileone rounded-t-md'}>
            <Link
              to={`/${user.username}`}
              onClick={() => handleClearSearchBar()}
              className='px-5 hover:text-navbarbuttonhighlight'
            >
              Profile
            </Link>
          </ProfileOne>
        ) : (
          <Link
            to={`/${user.username}`}
            onClick={() => handleClearSearchBar()}
            className='px-5 hover:text-navbarbuttonhighlight bg-graybutton rounded-t-md'
          >
            Profile
          </Link>
        )}

        {/* CHALLENGES */}
        {url.includes('challenges') ? (
          <ProfileOne className={'bg-profileone rounded-t-md'}>
            <Link
              to={`/${user.username}/challenges`}
              onClick={() => {
                handleClearSearchBar()
                setCurrentGame({ game: 'All' })
              }}
              className='px-5 hover:text-navbarbuttonhighlight'
            >
              Quests
            </Link>
          </ProfileOne>
        ) : (
          <Link
            to={`/${user.username}/challenges`}
            onClick={() => {
              handleClearSearchBar()
              setCurrentGame({ game: 'All' })
            }}
            className='px-5 hover:text-navbarbuttonhighlight bg-graybutton rounded-t-md'
          >
            Quests
          </Link>
        )}

        {/* ADD CHALLENGE */}
        {user.id === localStorage.getItem('id') ? (
          <div>
            {url.includes('add-challenge') ? (
              <ProfileOne className={'bg-profileone rounded-t-md'}>
                <Link
                  to={`/${localStorage.getItem('username')}/add-challenge`}
                  onClick={() => handleClearSearchBar()}
                  className='px-5 hover:text-navbarbuttonhighlight'
                >
                  +
                </Link>
              </ProfileOne>
            ) : (
              <ProfileTwo className={'bg-profiletwo rounded-t-md'}>
                <Link
                  to={`/${localStorage.getItem('username')}/add-challenge`}
                  onClick={() => handleClearSearchBar()}
                  className='px-5 hover:text-navbarbuttonhighlight'
                >
                  +
                </Link>
              </ProfileTwo>
            )}
          </div>
        ) : null}
      </div>

      {/* Modals */}
      <EditUserProfileModal open={openProfileEdit} setOpen={setOpenProfileEdit} submitUserProfile={submitUserProfile} loading={loading} user={user} />

      {/* PAGE ELEMENTS BASED ON TAB */}
      <Route
        exact
        path={`/:username`}
        render={(props) => (
          <ProfilePage
            acceptedChallenges={filteredAcceptedChallenges}
            challenge_game_stats={challenge_game_stats}
            featured_challenge={featured_challenge}
            ProfileOne={ProfileOne}
            ProfileTwo={ProfileTwo}
            user={user}
            {...props}
          />
        )}
      />
      <Route
        exact
        path={`/:username/challenges`}
        render={(props) => (
          <ChallengesSearchPage
            created_challenges={created_challenges}
            accepted_challenges={accepted_challenges}
            completed_challenges={completed_challenges}
            filteredCreatedChallenges={filteredCreatedChallenges}
            filteredAcceptedChallenges={filteredAcceptedChallenges}
            filteredCompletedChallenges={filteredCompletedChallenges}
            setFilteredCreatedChallenges={setFilteredCreatedChallenges}
            setFilteredAcceptedChallenges={setFilteredAcceptedChallenges}
            setFilteredCompletedChallenges={setFilteredCompletedChallenges}
            currentGame={currentGame}
            setCurrentGame={setCurrentGame}
            searchTerm={searchTerm}
            handleClearSearchBar={handleClearSearchBar}
            ProfileTwo={ProfileTwo}
            user={user}
            {...props}
          />
        )}
      />
      <Route
        exact
        path={`/:username/challenges/:challengeId`}
        render={(props) => (
          <ChallengeDetails
            refresh={refresh}
            setRefresh={setRefresh}
            ProfileOne={ProfileOne}
            ProfileTwo={ProfileTwo}
            {...props}
          />
        )}
      />
      <Route
        exact
        path={`/:username/add-challenge`}
        render={(props) => (
          <ChallengeForm
            refresh={refresh}
            setRefresh={setRefresh}
            ProfileOne={ProfileOne}
            ProfileTwoForm={ProfileTwoForm}
            ProfileOneButton={ProfileOneButton}
            {...props}
          />
        )}
      />
    </>
  );
}

export default UserPage;