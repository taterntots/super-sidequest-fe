import React from 'react';

// FUNCTIONS
import { levelUp } from '../../components/utils/Functions';

// UTILS
import moment from 'moment';
import styled from '@emotion/styled';

// IMAGES
import Tater from '../../img/Tater.png';
import Tots from '../../img/Tots.png';
import { ReactComponent as QuestListIcon } from '../../img/QuestList.svg';

// ----------------------------------------------------------------------------------
// ------------------------------------ USER CARD -----------------------------------
// ----------------------------------------------------------------------------------

const UserCard = ({ data }) => {
  const placeholderUserImages = [Tater, Tots]
  const {
    id,
    username,
    profile_pic_URL,
    profile_color_one,
    total_experience_points,
    total_created_challenges,
    created_at
  } = data;

  const ProfileOne = styled.div`
    background-color: ${profile_color_one ? profile_color_one : null};
  `

  return (
    <div key={id} className={`p-2 rounded-lg transform transition duration-500 hover:scale-105`}>
      {/* TOP IMG */}
      <ProfileOne className='flex bg-profileone text-white rounded-t-lg'>
        {profile_pic_URL ? (
          <img
            className='w-28 h-28 rounded-tl-lg'
            src={profile_pic_URL}
            alt='img for a single user'
          />
        ) : (
          <img
            className='w-28 h-28 rounded-tl-lg object-contain bg-indigo-400'
            src={placeholderUserImages[Math.floor(Math.random() * placeholderUserImages.length)]}
            alt='img for a single user'
          />
        )}
        <div className='mx-3 self-center'>
          <h1 className='text-lg font-medium'>
            {username}
          </h1>
          <h2 className='text-md font-medium'>
            Lvl {levelUp(total_experience_points).level}
          </h2>
          <h3 className='text-md font-medium'>
            JD: {moment(created_at).format('MM-DD-YYYY')}
          </h3>
        </div>
      </ProfileOne>

      {/* color bar */}
      <div className={`flex items-center justify-end px-4 py-2 text-sm text-white rounded-b-lg bg-gray-600`}>
        <QuestListIcon className='self-center ml-2 mr-1 w-5 h-5' />
        <span className='font-bold'>
          {total_created_challenges}
        </span>
      </div>
    </div>
  );
};

export default UserCard;