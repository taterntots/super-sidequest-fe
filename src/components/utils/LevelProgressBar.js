import React, { useState, useEffect } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// FUNCTIONS
import { levelUp } from './Functions';

// ----------------------------------------------------------------------------------
// ------------------------------- LEVEL PROGRESS BAR -------------------------------
// ----------------------------------------------------------------------------------

const LevelProgressBar = ({ user_experience_points, user }) => {
  const [level, setLevel] = useState();
  const [percentage, setPercentage] = useState();

  // UseEffect to set user level and experience points
  useEffect(() => {
    setLevel(levelUp(user_experience_points).level)
    setPercentage(levelUp(user_experience_points).percentage)
  }, [user_experience_points])

  return (
    <div className='text-white text-2xl font-medium' style={{ width: 80, heigh: 80 }}>
      <CircularProgressbarWithChildren
        value={percentage ? percentage : null}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: user.profile_color_two ? user.profile_color_two : '#3E828C',
          textColor: '#FFFFFF',
          pathColor: '#FFFFFF',
          trailColor: 'transparent'
        })}
      >
        <p className='cursor-default'>
          {level}
        </p>
      </CircularProgressbarWithChildren>
    </div >
  )
}
export default LevelProgressBar;