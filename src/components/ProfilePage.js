import React, { useState, useEffect } from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// --------------------------------- PROFILE PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const ProfilePage = ({ acceptedChallenges, loading, refresh, setRefresh }) => {
  console.log(acceptedChallenges)
  return (
    <>
      <div className="lg:flex justify-between">
        <div className="mr-3 w-full lg:w-2/5 h-full p-10 bg-taterpurple rounded-lg text-white">
          <h1 className='text-center'>
            Featured Quest
          </h1>
        </div>
        <div className="w-full lg:w-3/5 h-full px-10 bg-taterpurple rounded-lg text-white">
          <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
            Active Quests
          </h1>
          {acceptedChallenges.map(acceptedChallenge => (
            <Link
              to={`/${acceptedChallenge.username}/challenges/${acceptedChallenge.challenge_id}`}
              className='flex p-2 mb-3 rounded-lg hover:bg-purple-500'
            >
              <img
                className='h-24 w-44 rounded-md'
                src={acceptedChallenge.banner_pic_URL}
                alt='banner for a single game'
              />
              <div className='flex justify-between w-full'>
                <div className='ml-4 self-center'>
                  <div className='flex justify-between'>
                    <p>{acceptedChallenge.name}</p>
                  </div>
                  <p>by {acceptedChallenge.username}</p>
                  <p>{acceptedChallenge.description}</p>
                </div>
                <div className='ml-4'>
                  <p className='px-2 border-2 rounded-md'>{acceptedChallenge.system}</p>
                </div>
              </div>
            </Link>
          ))}
          {/* FIXES WEIRD MARGIN ISSUE WHEN IN MOBILE VIEW */}
          <div className='invisible pt-1' />
        </div>
      </div >
    </>
  );
}

export default ProfilePage;