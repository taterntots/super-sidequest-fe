// Function to calculate level based on total experience points
export const levelUp = (EXP) => {
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