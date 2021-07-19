import React, { useState, useEffect } from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// FUNCTIONS
import { levelUp } from '../../components/utils/Functions';

// ----------------------------------------------------------------------------------
// ------------------------------- USER LEADERBOARD ---------------------------------
// ----------------------------------------------------------------------------------

const UserLeaderboard = ({ users }) => {
  const [usersSortedByLevel, setUsersSortedByLevel] = useState([]);

  useEffect(() => {
    let getUsers = [...users]
    setUsersSortedByLevel(getUsers.sort((a, b) => b.total_experience_points - a.total_experience_points))
  }, [users])

  return (
    <>
      <div className='w-full h-full px-2 bg-profiletwo rounded-lg text-white'>
        {/* LEADERBOARD HEADERS */}
        <div className='rounded-lg bg-gray-700 my-2'>
          <div className='flex w-full text-center px-2 py-1 font-bold'>
            <p className='w-1/12'>Rank</p>
            <p className='w-10/12'>
              Player
            </p>
            <p className='w-1/12'>
              Level
            </p>
          </div>

          {/* LEADERBOARD DATA */}
          {usersSortedByLevel ? usersSortedByLevel.map((score, index) => (
            <Link
              key={score.id}
              to={`/${score.username}`}
            >
              <div key={score.id} className={score.username === localStorage.getItem('username') ?
                `flex text-center font-medium text-graybutton bg-white px-2 py-1 hover:opacity-60 hover:bg-white hover:text-graybutton` :
                `flex text-center font-medium ${index % 2 ? 'bg-gray-600' : 'bg-gray-500'} px-2 py-1 hover:opacity-60`}>
                <p className='w-1/12'>{index + 1}</p>
                <p className='w-10/12'>
                  {score.username}
                </p>
                <p className='w-1/12'>
                  {levelUp(score.total_experience_points).level}
                </p>
              </div>
            </Link>

          )) : null}
          <p className='invisible'>
            INVISIBLE TEXT TO SHOW ROUNDED BORDER
          </p>
        </div>
      </div>
    </>
  );
};

export default UserLeaderboard;