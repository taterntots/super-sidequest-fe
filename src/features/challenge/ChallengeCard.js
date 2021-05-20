import React from 'react';

// IMAGES
// import { ReactComponent as BlankPublisher } from '../../img/icon/BlankPublisher.svg';

// ----------------------------------------------------------------------------------
// --------------------------------- CHALLENGE CARD ---------------------------------
// ----------------------------------------------------------------------------------

const ChallengeCard = ({ data }) => {
  const {
    challenge_id,
    name,
    description,
    username,
    game_title,
    banner_pic_URL,
    system,
    difficulty,
    points
  } = data;

  return (
    <div
      key={challenge_id}
      className={`hover:bg-cardhover max-w-359 hover:bg-opacity-25 p-2 rounded-md text-white`}
    >
      <div className={`overflow-hidden`}>
        {/* TOP IMG */}
        <img
          src={banner_pic_URL}
          alt='img for a challenge'
          className='object-fill w-full h-full min-h-full max-h-40 rounded-t-md'
        />

        {/* color bar */}
        <div className={`relative  w-full`}>

          {/* TYPE */}
          <div className={`flex items-center justify-between px-4 py-2 text-sm text-white rounded-b-lg
          ${difficulty === 'Easy' && 'bg-easy'}
          ${difficulty === 'Medium' && 'bg-medium'}
          ${difficulty === 'Hard' && 'bg-hard'}
          `}
          >
            <span>{game_title}</span>
            <span>{difficulty}</span>
          </div>
        </div>

        <div className='flex items-start pt-2'>
          <div className='flex-shrink-0 pt-1'>
            {banner_pic_URL ? (
              <img
                src={banner_pic_URL}
                alt='img for a publisher profile'
                className='inline-block object-fill w-12 h-12 rounded-md'
              />
            ) : (
              <p>NO IMAGE</p>
              // <BlankPublisher className='inline-block object-fill w-12 h-12 rounded-md' />
            )}
          </div>

          <div className='flex-1 w-0 ml-5'>
            <dl>
              <dt className='text-sm font-medium leading-5 truncate-2-lines'>
                {name}
              </dt>
              <dd>
                <div className='text-xs font-medium leading-4 truncate'>
                  {username}
                </div>
                <div className='text-xs font-medium text-instruments truncate-2-lines'>
                  {system}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;