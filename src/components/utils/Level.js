import React from 'react'

// ----------------------------------------------------------------------------------
// -------------------------------------- LEVEL -------------------------------------
// ----------------------------------------------------------------------------------

const Level = ({ user_experience_points }) => {

  const levelUp = (EXP) => {
    const threshold = 150 // How much we want experience threshold to increase with each level up
    return 0.5 + Math.sqrt(1 + 8 * (EXP) / (threshold)) / 2 // Quadratic formula to make it all work!
  }

  return (
    <div className='text-white text-2xl font-medium'>
      {levelUp(user_experience_points)}
    </div >
  )
}
export default Level;