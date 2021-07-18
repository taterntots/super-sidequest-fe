import React, { useState, useEffect } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// ----------------------------------------------------------------------------------
// -------------------------------------- LEVEL -------------------------------------
// ----------------------------------------------------------------------------------

const Level = ({ user_experience_points, user }) => {
  const [level, setLevel] = useState();
  const [percentage, setPercentage] = useState();

  // UseEffect to set user level and experience points
  useEffect(() => {
    setLevel(levelUp(user_experience_points).level)
    setPercentage(levelUp(user_experience_points).percentage)
  }, [user_experience_points])

  // Function to calculate level based on total experience points
  const levelUp = (EXP) => {
    const threshold = 150 // How much we want experience threshold to increase with each level up

    // Quadratic formulas to make it all work!
    const level = Math.floor(0.5 + Math.sqrt(1 + 8 * (EXP) / (threshold)) / 2)
    const decimal = 0.5 + Math.sqrt(1 + 8 * (EXP) / (threshold)) / 2
    const percentage = parseFloat(decimal % 1).toPrecision(2).split('.')[1]

    return {
      level: level,
      percentage: percentage
    }
  }

  return (
    <div className='text-white text-2xl font-medium' style={{ width: 80, heigh: 80 }}>
      <CircularProgressbarWithChildren
        value={percentage ? percentage : null}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: user.profile_color_two,
          textColor: '#FFFFFF',
          pathColor: '#FFFFFF',
          trailColor: 'transparent'
        })}
      >
        {level}
      </CircularProgressbarWithChildren>
    </div >
  )
}
export default Level;