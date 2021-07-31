import React, { useState, useEffect } from 'react';

// ROUTING
import { useRouteMatch } from 'react-router-dom';

// STYLING
import styled from '@emotion/styled';

// DATE
import moment from 'moment';

// IMAGES
import { ReactComponent as UsersIcon } from '../../img/UsersIcon.svg'
import { ReactComponent as CompleteBadge } from '../../img/CompleteBadge.svg'

// COMPONENTS
import CardTimer from '../../components/utils/CardTimer';

// ----------------------------------------------------------------------------------
// --------------------------------- CHALLENGE CARD ---------------------------------
// ----------------------------------------------------------------------------------

const ChallengeCard = ({ data, user }) => {
  const route = useRouteMatch();
  const [countdownIsAfter, setCountdownIsAfter] = useState(true);

  const {
    challenge_id,
    name,
    description,
    username,
    game_title,
    banner_pic_URL,
    system,
    difficulty,
    active_users,
    is_active,
    completed,
    end_date
  } = data;

  // UseEffect that sets whether a challenge has expired or not
  useEffect(() => {
    if (moment(end_date).isAfter()) {
      setCountdownIsAfter(true)
    } else {
      setCountdownIsAfter(false)
    }
  }, [end_date])

  const ProfileOne = styled.p`
  background-color: ${route.params.username && user ? user.profile_color_one : null};
`

  return (
    <div className={countdownIsAfter || !end_date ?
      'p-2 rounded-lg hover:bg-sitewidebackground transform transition duration-500 hover:scale-105' :
      'opacity-60 p-2 rounded-lg hover:bg-sitewidebackground transform transition duration-500 hover:scale-105'}
    >
      <div
        key={challenge_id}
        className='md:flex'
      >
        {completed ? (
          <CompleteBadge className='absolute p-1 bg-complete rounded-tl-md rounded-br-md w-8 h-8 opacity-80' />
        ) : is_active ? (
          <CompleteBadge className='absolute p-1 bg-active rounded-tl-md rounded-br-md w-8 h-8 opacity-80' />
        ) : null}
        <img
          className='md:h-24 md:w-44 rounded-md'
          src={banner_pic_URL}
          alt='banner for a single challenge'
        />
        <div className='md:flex md:justify-between text-center md:text-left w-full'>
          <div className='md:ml-4 self-center mt-4 md:mt-0'>
            <p>{name}</p>
            <p>{game_title}</p>
            <p>by {username}</p>
          </div>
          <div className='flex justify-evenly md:flex-col text-full mt-4 md:mt-0'>
            <p className='text-center truncate px-2 border-2 rounded-md'>{system}</p>
            <p className='text-center truncate px-2 border-2 rounded-md'>{difficulty}</p>
          </div>
        </div>
      </div>
      <div className='text-center'>
        <ProfileOne className='mt-4 p-1 border-2 px-10 rounded-md bg-profileone'>
          {description}
        </ProfileOne>
      </div>
      <div className='flex justify-between mt-2'>
        <p className='font-bold'>
          {countdownIsAfter ? (
            <CardTimer end_date={end_date} setCountdownIsAfter={setCountdownIsAfter} />
          ) : (
            <p className={end_date ?
              'font-medium text-md text-center' :
              'hidden font-medium text-md text-center'}
            >
              Quest Ended
            </p>
          )}
        </p>
        <div className='flex'>
          <UsersIcon className='self-center w-10 h-5' />
          <p className='self-center font-bold'>
            {active_users}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;