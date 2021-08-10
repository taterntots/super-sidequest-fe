import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserFollowings,
  fetchUserFollowers,
  fetchCheckIfFollowingUser,
  fetchUserByUsername,
  fetchUserEXPForAllGames,
  fetchUserEXPForGameById,
  fetchUserAdminStatus,
  followUser,
  unfollowUser,
  updateUser,
  deleteUser,
  banUser,
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
import { Route, Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';

// UTILS
import queryString from 'query-string';

// STYLING
import styled from '@emotion/styled';

// COMPONENTS
import ProfilePage from './ProfilePage';
import ChallengesSearchPage from './ChallengesSearchPage';
import ChallengeDetails from '../features/challenge/ChallengeDetails';
import FollowerPage from './FollowerPage';
import ChallengeForm from '../features/challenge/ChallengeForm';
import LevelProgressBar from './utils/LevelProgressBar';
import EditUserProfileModal from './utils/modals/EditUserProfileModal';
import DeleteUserModal from './utils/modals/DeleteUserModal';
import BanUserModal from './utils/modals/BanUserModal';
import AuthModal from './utils/modals/AuthModal';

// IMAGES
import SuperSidequestBanner from '../img/SuperSidequestBanner.jpeg';
import { ReactComponent as BlankUser } from '../img/BlankUser.svg';
import { ReactComponent as TwitterLogo } from '../img/TwitterLogo.svg';
import { ReactComponent as DiscordLogo } from '../img/DiscordLogo.svg';
import { ReactComponent as YouTubeLogo } from '../img/YouTubeLogo.svg';
import { ReactComponent as TwitchLogo } from '../img/TwitchLogo.svg';
import { ReactComponent as PatreonLogo } from '../img/PatreonLogo.svg';

// ----------------------------------------------------------------------------------
// ----------------------------------- USER PAGE-------------------------------------
// ----------------------------------------------------------------------------------

const UserPage = ({ searchTerm, refresh, setRefresh, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, user_admin, user_followings, user_followers, user_experience_points, user_game_experience_points, is_following_user, loading } = useSelector(userSelector);
  const { created_challenges, accepted_challenges, completed_challenges, challenge_game_stats, featured_challenge } = useSelector(challengeSelector);
  const [filteredCreatedChallenges, setFilteredCreatedChallenges] = useState(created_challenges);
  const [filteredAcceptedChallenges, setFilteredAcceptedChallenges] = useState(accepted_challenges);
  const [filteredCompletedChallenges, setFilteredCompletedChallenges] = useState(completed_challenges);
  const [sortOption, setSortOption] = useState('recent');
  const [currentGame, setCurrentGame] = useState({})
  const [currentGameId, setCurrentGameId] = useState()
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [openUserDelete, setOpenUserDelete] = useState(false);
  const [openUserBan, setOpenUserBan] = useState(false);
  const [isFollowingToggle, setIsFollowingToggle] = useState(false);
  const [unfollowText, setUnfollowText] = useState('Following')
  const [openAuth, setOpenAuth] = useState(false);
  const [authPage, setAuthPage] = useState('login');
  const url = window.location.href; // GRABS REFERENCE TO THE CURRENT URL TO CHECK WHICH TAB TO SELECT FOR STYLING
  const route = useRouteMatch();
  const location = useLocation();

  // Grabs user data from the server
  useEffect(() => {
    dispatch(fetchUserByUsername(route.params.username))
  }, [refresh, route.params.username])

  // Sets game filter if exists in URL
  useEffect(() => {
    if (location.search) {
      setCurrentGame(queryString.parse(location.search))
    } else {
      setCurrentGame({ game: 'All' })
    }
  }, [location.search, completed_challenges])

  // Sets current game ID based on game filter
  useEffect(() => {
    if (completed_challenges.length > 0) {
      setCurrentGameId(completed_challenges.find(coc => coc.game_title === currentGame.game))
    }
  }, [currentGame, completed_challenges])

  // Grabs user admin status
  useEffect(() => {
    if (localStorage.getItem('id')) {
      dispatch(fetchUserAdminStatus(localStorage.getItem('id')))
    }
  }, [dispatch, refresh])

  // Grabs endpoints relying on userID after grabbing user in above useEffect
  useEffect(() => {
    if (Object.keys(user).length > 1) {
      dispatch(fetchUserCreatedChallenges({ user_id: user.id, sort_option: sortOption }))
      dispatch(fetchUserAcceptedChallenges({ user_id: user.id, sort_option: sortOption }))
      dispatch(fetchUserCompletedChallenges({ user_id: user.id, sort_option: sortOption }))
      dispatch(fetchUserCompletedChallengeTotal(user.id))
      dispatch(fetchUserFeaturedChallenge(user.id))
      dispatch(fetchUserFollowings(user.id))
      dispatch(fetchUserFollowers(user.id))
      dispatch(fetchUserEXPForAllGames(user.id))
      if (localStorage.getItem('id')) {
        dispatch(fetchUserAdminStatus(localStorage.getItem('id')))
      }
    }
  }, [dispatch, user, sortOption, refresh])

  // Fetches experience points for game if URL is looking for a specific game
  useEffect(() => {
    if (Object.keys(user).length > 1) {
      if (currentGameId && currentGame.game !== 'All') {
        dispatch(fetchUserEXPForGameById({ user_id: user.id, game_id: currentGameId.game_id }))
      }
    }
  }, [dispatch, user, currentGameId, currentGame, refresh])

  // UseEffect to check if the logged in user is following the current user profile
  useEffect(() => {
    if (Object.keys(user).length > 1 && localStorage.getItem('id')) {
      dispatch(fetchCheckIfFollowingUser(user.id))
    }
  }, [user, isFollowingToggle])

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
    data.admin_override = user_admin
    data.user_id = user.id

    dispatch(updateUser(data))
      .then(res => {
        setOpenProfileEdit(false)
        setRefresh(!refresh)
      })
      .catch(err => {
        console.log(err)
      })
  };

  // Function to handle following a user
  const submitFollowUser = async () => {
    dispatch(followUser(user.id))
      .then(res => {
        setIsFollowingToggle(!isFollowingToggle)
      })
      .catch(err => {
        console.log(err)
      })
  };

  // Function to handle unfollowing a user
  const submitUnfollowUser = async () => {
    dispatch(unfollowUser(user.id))
      .then(res => {
        setIsFollowingToggle(!isFollowingToggle)
      })
      .catch(err => {
        console.log(err)
      })
  };

  // Function to handle deleting a user
  const submitUserDelete = async () => {
    dispatch(deleteUser(user.id))
      .then(res => {
        history.push(`/users`)
        setOpenUserDelete(false);
        setRefresh(!refresh)
      })
      .catch(err => {
        console.log(err)
      })
  };

  // Function to handle banning a user
  const submitUserBan = async () => {
    dispatch(banUser(user.id))
      .then(res => {
        history.push(`/users`)
        setOpenUserBan(false);
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
  const ProfileFollowButton = styled.button`
    &:hover {
      background-color: ${user.profile_color_two ? user.profile_color_two : null};
      border-color: ${user.profile_color_two ? user.profile_color_two : null};
    }
  `
  const ProfileUnfollowButton = styled.button`
    background-color: ${user.profile_color_two ? user.profile_color_two : null};
    border-color: ${user.profile_color_two ? user.profile_color_two : null};
  `

  return (
    <>
      {/* USER INFO */}
      <div className='mb-4'>
        <div
          className={user_admin && localStorage.getItem('token') ?
            'hover:opacity-50 cursor-pointer transform transition' :
            ''}
          onClick={() => user_admin && localStorage.getItem('token') ? setOpenProfileEdit(true) : null}
        >
          <img
            className='object-cover h-72 w-full rounded-t-lg'
            src={user.banner_pic_URL ? user.banner_pic_URL : SuperSidequestBanner}
            alt='banner for a user'
          />
          {user_admin && localStorage.getItem('token') ? (
            <p className='opacity-0 hover:opacity-100 absolute text-5xl font-bold text-white flex justify-center items-center bottom-0 top-0 right-0 left-0'>
              EDIT
            </p>
          ) : null}
        </div>

        <ProfileOne className={user.twitter_URL || user.twitch_URL || user.youtube_URL || user.discord_URL ?
          `bg-profileone` :
          `bg-profileone rounded-b-lg`}
        >
          <div className='sm:px-10'>
            <div className='flex justify-center sm:justify-between pt-3 pb-1 sm:pb-3'>

              {/* PROFILE PIC AND NAME CONTAINER */}
              <div className='flex'>
                {user.profile_pic_URL ? (
                  <img
                    src={user.profile_pic_URL}
                    className='hidden sm:inline object-fill w-20 h-20 rounded-md'
                    alt='user avatar'
                  >
                  </img>
                ) : (
                  <BlankUser
                    className='hidden sm:inline object-fill w-20 h-20 rounded-md'
                    alt='placeholder for user avatar'
                  />
                )}
                <div className='sm:hidden self-center'>
                  <LevelProgressBar user_experience_points={!location.search || currentGame.game === 'All' ?
                    user_experience_points :
                    location.search && currentGame.game !== 'All' && currentGameId ? user_game_experience_points :
                      null}
                    user={user}
                  />
                </div>

                {/* NAME AND FOLLOWER BUTTONS */}
                <div className='self-center text-center ml-3'>
                  <h1 className='pb-2 px-2 text-3xl sm:text-4xl text-white'>{user.username}</h1>
                  {is_following_user && user.id !== localStorage.getItem('id') && localStorage.getItem('token') ? (
                    <ProfileUnfollowButton
                      className='w-full px-3 text-white bg-profiletwo border-profiletwo hover:border-white hover:bg-transparent font-medium border-2 rounded-xl'
                      onClick={submitUnfollowUser}
                      onMouseOver={() => setUnfollowText('Unfollow')}
                      onMouseOut={() => setUnfollowText('Following')}
                    >
                      {unfollowText}
                    </ProfileUnfollowButton>
                  ) : !is_following_user && user.id !== localStorage.getItem('id') && localStorage.getItem('token') ? (
                    <ProfileFollowButton
                      className='w-full px-3 text-white hover:bg-profiletwo hover:border-profiletwo font-medium border-2 rounded-xl'
                      onClick={submitFollowUser}
                    >
                      Follow
                    </ProfileFollowButton>
                  ) : user.id === localStorage.getItem('id') && localStorage.getItem('token') ? (
                    <ProfileFollowButton
                      className='w-full px-3 text-white hover:bg-profiletwo hover:border-profiletwo font-medium border-2 rounded-xl'
                      onClick={() => setOpenProfileEdit(true)}
                    >
                      Edit Profile
                    </ProfileFollowButton>
                  ) : (
                    <ProfileFollowButton
                      className='w-full px-3 text-white hover:bg-profiletwo hover:border-profiletwo font-medium border-2 rounded-xl'
                      onClick={() => setOpenAuth(true)}
                    >
                      Follow
                    </ProfileFollowButton>
                  )}
                </div>

                {/* FOLLOWER AND FOLLOWING STATS */}
                <div className='hidden sm:inline ml-6 self-end text-white'>
                  <p>
                    <span className='font-bold text-lg'>{user_followings.length}</span> Following
                  </p>
                  <p>
                    <span className='font-bold text-lg'>{user_followers.length}</span> Followers
                  </p>
                </div>
                {/* BADGES */}
                {user.is_patreon ? (
                  <div className='hidden sm:block self-center ml-6 border-l-2 py-4 px-5 h-full'>
                    <PatreonLogo className='h-full w-8 md:w-12' />
                  </div>
                ) : null}
              </div>

              {/* LEVEL UP ICON */}
              <div className='hidden sm:inline self-center'>
                <LevelProgressBar user_experience_points={!location.search || currentGame.game === 'All' ?
                  user_experience_points :
                  location.search && currentGame.game !== 'All' && currentGameId ? user_game_experience_points :
                    null}
                  user={user}
                />
              </div>
            </div>

            {/* FOLLOWER AND FOLLOWING STATS (MOBILE)*/}
            <div className='sm:hidden flex justify-center text-white pb-3'>
              {user.is_patreon ? (
                <PatreonLogo className='sm:hidden self-center mr-5 pt-1 h-6 w-6' />
              ) : null}
              <p>
                <span className='font-bold text-lg'>{user_followings.length}</span> Following
              </p>
              <p className='ml-6'>
                <span className='font-bold text-lg'>{user_followers.length}</span> Followers
              </p>
            </div>
          </div>
        </ProfileOne>

        {/* SOCIAL ICONS */}
        <div className='flex rounded-b-lg overflow-hidden'>
          {user.twitter_URL ? (
            <a className='flex justify-center w-full py-1 h-6 bg-twitter cursor-pointer hover:opacity-80' href={user.twitter_URL} target='_blank'>
              <TwitterLogo />
            </a>
          ) : null}
          {user.twitch_URL ? (
            <a className='flex justify-center w-full py-1 h-6 bg-twitch cursor-pointer hover:opacity-80' href={user.twitch_URL} target='_blank'>
              <TwitchLogo />
            </a>
          ) : null}
          {user.discord_URL ? (
            <a className='flex justify-center w-full py-1 h-6 bg-discord cursor-pointer hover:opacity-80' href={user.discord_URL} target='_blank'>
              <DiscordLogo />
            </a>
          ) : null}
          {user.youtube_URL ? (
            <a className='flex justify-center w-full py-1 h-6 bg-youtube cursor-pointer hover:opacity-80' href={user.youtube_URL} target='_blank'>
              <YouTubeLogo />
            </a>
          ) : null}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className='flex flex-row items-center justify-start text-xl text-white'>
        {/* PROFILE */}
        {!url.includes('challenges') && !url.includes('friends') && !url.includes('add-challenge') ? (
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

        {/* FRIENDS */}
        {url.includes('friends') ? (
          <ProfileOne className={'bg-profileone rounded-t-md'}>
            <Link
              to={`/${user.username}/friends`}
              onClick={() => handleClearSearchBar()}
              className='px-5 hover:text-navbarbuttonhighlight'
            >
              Friends
            </Link>
          </ProfileOne>
        ) : (
          <Link
            to={`/${user.username}/friends`}
            onClick={() => handleClearSearchBar()}
            className='px-5 hover:text-navbarbuttonhighlight bg-graybutton rounded-t-md'
          >
            Friends
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
      <EditUserProfileModal open={openProfileEdit} setOpen={setOpenProfileEdit} setOpenDelete={setOpenUserDelete} setOpenBan={setOpenUserBan} submitUserProfile={submitUserProfile} loading={loading} user={user} user_admin={user_admin} />
      <DeleteUserModal open={openUserDelete} setOpen={setOpenUserDelete} submitUserDelete={submitUserDelete} loading={loading} />
      <BanUserModal open={openUserBan} setOpen={setOpenUserBan} submitUserBan={submitUserBan} loading={loading} />
      <AuthModal open={openAuth} setOpen={setOpenAuth} authPage={authPage} setAuthPage={setAuthPage} refresh={refresh} setRefresh={setRefresh} />

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
            sortOption={sortOption}
            setSortOption={setSortOption}
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
        path={`/:username/friends`}
        render={(props) => (
          <FollowerPage
            user_followings={user_followings}
            user_followers={user_followers}
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