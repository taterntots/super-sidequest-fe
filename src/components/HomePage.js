import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchRecentChallenges,
  fetchTaterFeaturedChallenge,
  challengeSelector
} from '../features/challenge/challengeSlice';

// ROUTING
import { Link } from 'react-router-dom';

// REACT PLAYER
import ReactPlayer from 'react-player/twitch';

// COMPONENTS
import ChallengeCard from '../features/challenge/ChallengeCard.js';
import FeaturedChallengeCard from '../features/challenge/FeaturedChallengeCard.js';
import Hero from '../components/HeroCard';

// ----------------------------------------------------------------------------------
// ------------------------------------ HOMEPAGE ------------------------------------
// ----------------------------------------------------------------------------------

const HomePage = ({ refresh }) => {
  const dispatch = useDispatch();
  const { recent_challenges, tater_featured_challenge } = useSelector(challengeSelector)

  useEffect(() => {
    dispatch(fetchRecentChallenges(localStorage.getItem('id')))
    dispatch(fetchTaterFeaturedChallenge(process.env.REACT_APP_TATER_ID))
  }, [dispatch, refresh])

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* BODY */}
      <div className='xl:flex justify-between'>
        {/* TATER'S QUEST */}
        <div className='w-full xl:w-7/12 mr-3'>
          {tater_featured_challenge.challenge_id ? (
            <FeaturedChallengeCard data={tater_featured_challenge} />
          ) : null}

          {/* TATER'S STREAM */}
          <div className='px-10 mb-3 pb-4 bg-profiletwo rounded-xl text-white'>
            <h1 className='text-center text-2xl font-medium py-4'>
              Tater & Tots
            </h1>
            <ReactPlayer
              url='https://www.twitch.tv/tater_n_tots'
              width='100%'
              muted={true}
              controls
            />
          </div>
        </div>

        {/* RECENT QUESTS */}
        <div className='w-full xl:w-5/12'>
          <div className='px-10 pb-4 bg-profiletwo rounded-xl text-white'>
            <h1 className='text-center text-2xl font-medium py-4'>
              Recent Quests
            </h1>
            <div className='grid gap-6 grid-cols-1'>
              {recent_challenges.map(challenge => (
                <Link
                  key={challenge.challenge_id}
                  to={`/${challenge.username}/challenges/${challenge.challenge_id}`}
                >
                  <ChallengeCard
                    key={challenge.challenge_id}
                    data={challenge}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default HomePage;