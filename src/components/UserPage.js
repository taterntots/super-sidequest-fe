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
import { Route, Link, useRouteMatch } from 'react-router-dom';

// COMPONENTS
import ProfilePage from './ProfilePage';
import ChallengesPage from './ChallengesPage';
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
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const url = window.location.href; // GRABS REFERENCE TO THE CURRENT URL TO CHECK WHICH TAB TO SELECT FOR STYLING
  const route = useRouteMatch();

  // Grabs user data from the server
  useEffect(() => {
    dispatch(fetchUserByUsername(route.params.username))
  }, [dispatch, refresh, route.params.username])

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
    setFilteredCreatedChallenges(created_challenges)
    setFilteredAcceptedChallenges(accepted_challenges)
    setFilteredCompletedChallenges(completed_challenges)
  }, [created_challenges, accepted_challenges, completed_challenges])

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

  return (
    <>
      {/* USER INFO */}
      <div className='mb-4'>
        <div>
          <img
            className='object-cover h-72 w-full rounded-t-md'
            onClick={() => localStorage.getItem('id') === user.id ? setOpenProfileEdit(true) : null}
            src={user.banner_pic_URL ? user.banner_pic_URL : UserBannerPlaceholder}
            alt='banner for a user'
          />
        </div>
        <div className='px-0 sm:px-10 bg-profiletwo rounded-b-lg'>
          <div className='sm:flex justify-between'>
            <div className='flex justify-center items-center py-3'>
              {user.profile_pic_URL ? (
                <img
                  src={user.profile_pic_URL}
                  className='inline-block object-fill w-12 h-12 rounded-md'
                  onClick={() => localStorage.getItem('id') === user.id ? setOpenProfileEdit(true) : null}
                  alt='user avatar'
                >
                </img>
              ) : (
                <BlankUser
                  className='inline-block object-fill w-12 h-12 rounded-md'
                  onClick={() => localStorage.getItem('id') === user.id ? setOpenProfileEdit(true) : null}
                  alt='placeholder for user avatar'
                />
              )}
              <h1 className='pl-5 text-3xl text-white'>{user.username}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className='flex flex-row items-center justify-start text-xl text-white'>
        <Link
          to={`/${user.username}`}
          onClick={() => handleClearSearchBar()}
          className={!url.includes('challenges') && !url.includes('add-challenge') ?
            "px-5 hover:text-navbarbuttonhighlight bg-profiletwo rounded-t-md" :
            "px-5 hover:text-navbarbuttonhighlight bg-gray-700 rounded-t-md"}
        >
          Profile
        </Link>
        <Link
          to={`/${user.username}/challenges`}
          onClick={() => handleClearSearchBar()}
          className={url.includes('challenges') ?
            "px-5 hover:text-navbarbuttonhighlight bg-profiletwo rounded-t-md" :
            "px-5 hover:text-navbarbuttonhighlight bg-gray-700 rounded-t-md"}
        >
          Challenges
        </Link>
        {user.id === localStorage.getItem('id') ? (
          <Link
            to={`/${localStorage.getItem('username')}/add-challenge`}
            className={url.includes('add-challenge') ?
              "px-5 hover:text-navbarbuttonhighlight bg-profiletwo rounded-t-md" :
              "px-5 hover:text-navbarbuttonhighlight bg-profileone rounded-t-md"}
          >
            +
          </Link>
        ) : null}
      </div>

      {/* Modals */}
      <EditUserProfileModal open={openProfileEdit} setOpen={setOpenProfileEdit} submitUserProfile={submitUserProfile} loading={loading} user={user} />

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
            <ChallengesPage
              created_challenges={created_challenges}
              accepted_challenges={accepted_challenges}
              completed_challenges={completed_challenges}
              filteredCreatedChallenges={filteredCreatedChallenges}
              filteredAcceptedChallenges={filteredAcceptedChallenges}
              filteredCompletedChallenges={filteredCompletedChallenges}
              setFilteredCreatedChallenges={setFilteredCreatedChallenges}
              setFilteredAcceptedChallenges={setFilteredAcceptedChallenges}
              setFilteredCompletedChallenges={setFilteredCompletedChallenges}
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
              refresh={refresh}
              setRefresh={setRefresh}
              {...props}
            />
          )}
        />
      </div>
    </>
  );
}

export default UserPage;