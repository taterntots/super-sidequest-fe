import React, { useState, useEffect } from 'react';

// STATE
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDifficulties,
  difficultySelector
} from '../features/difficulty/difficultySlice';
import {
  fetchSystems,
  systemSelector
} from '../features/system/systemSlice';

// COMPONENTS
import ChallengeList from '../features/challenge/ChallengeList';

// ----------------------------------------------------------------------------------
// ----------------------------- GAME CHALLENGES PAGE -------------------------------
// ----------------------------------------------------------------------------------

const GameChallengesPage = ({ challenges, popular_challenges, filteredChallenges, filteredPopularChallenges, setFilteredChallenges, setFilteredPopularChallenges, searchTerm, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const { difficulties } = useSelector(difficultySelector);
  const { systems } = useSelector(systemSelector)
  const [currentChallengeFilter, setCurrentChallengeFilter] = useState('All')

  // Grabs filterable data from the server
  useEffect(() => {
    dispatch(fetchDifficulties())
    dispatch(fetchSystems())
  }, [dispatch])

  // Filter all challenges
  const filterReset = () => {
    setFilteredChallenges(challenges)
    setFilteredPopularChallenges(popular_challenges)
    var selectBox = document.getElementById("difficultyBox");
    selectBox.selectedIndex = 0;
    var selectBox = document.getElementById("systemBox");
    selectBox.selectedIndex = 0;
  }

  // Filter master
  const filterMaster = () => {
    var systemBox = document.getElementById("systemBox");
    var difficultyBox = document.getElementById("difficultyBox");
    var selectedSystemValue = systemBox.options[systemBox.selectedIndex].value;
    var selectedDifficultyValue = difficultyBox.options[difficultyBox.selectedIndex].value;

    if (currentChallengeFilter === 'All') {
      var filtered = challenges.filter(fc => {
        if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select') {
          return fc.system === selectedSystemValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue && fc.system === selectedSystemValue
        }
      })
      setFilteredChallenges(filtered)
    } else if (currentChallengeFilter === 'Popular') {
      var filtered = popular_challenges.filter(fc => {
        if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select') {
          return fc.system === selectedSystemValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue && fc.system === selectedSystemValue
        }
      })
      setFilteredPopularChallenges(filtered)
    }
  }

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
        {/* CHALLENGE LIST */}
        <div className="mr-3 w-full lg:w-4/5 h-full pb-4 px-10 bg-profileone rounded-lg text-white">
          <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
            {currentChallengeFilter === 'All' ? 'All Quests' :
              currentChallengeFilter === 'Popular' ? 'Popular Quests' :
                currentChallengeFilter === 'Completed' ? 'Completed Quests' :
                  null
            }
          </h1>
          <ChallengeList
            challenges={
              currentChallengeFilter === 'All' ? filteredChallenges :
                currentChallengeFilter === 'Popular' ? filteredPopularChallenges :
                  null
            }
            searchTerm={searchTerm}
            handleClearSearchBar={handleClearSearchBar}
          />
        </div>

        {/* CHALLENGE TYPE */}
        <div className='w-full lg:w-1/5'>
          <div className="px-10 mb-3 pb-4 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
              Quest Type
            </h1>
            <div className='flex flex-col'>
              <button
                className={currentChallengeFilter === 'All' ?
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profiletwo hover:bg-white hover:text-profiletwo focus:outline-none transition duration-150 ease-in-out" :
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-gray-700 hover:bg-white hover:text-profiletwo focus:outline-none transition duration-150 ease-in-out"}
                onClick={() => {
                  setCurrentChallengeFilter('All')
                  filterReset()
                  handleClearSearchBar()
                }}
              >
                All
              </button>
              <button
                className={currentChallengeFilter === 'Popular' ?
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profiletwo hover:bg-white hover:text-profiletwo focus:outline-none transition duration-150 ease-in-out" :
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-gray-700 hover:bg-white hover:text-profiletwo focus:outline-none transition duration-150 ease-in-out"}
                onClick={() => {
                  setCurrentChallengeFilter('Popular')
                  filterReset()
                  handleClearSearchBar()
                }}
              >
                Popular
              </button>
            </div>
          </div>

          {/* FILTERS */}
          <div className="px-10 pb-4 mb-3 lg:mb-0 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Filter By
            </h1>
            <div className='flex flex-col'>
              <button
                onClick={() => {
                  filterReset()
                  handleClearSearchBar()
                }}
                className={`items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profiletwo hover:bg-white hover:text-profiletwo focus:outline-none transition duration-150 ease-in-out`}
              >
                Reset
              </button>
              <select name='difficulty' id='difficultyBox' onChange={filterMaster} className='mb-4 text-black px-1 rounded-md'>
                <option value='Select' disabled selected>Difficulty</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.name}>{difficulty.name}</option>
                ))}
              </select>
              <select name='system' id='systemBox' onChange={filterMaster} className='text-black px-1 rounded-md'>
                <option value='Select' disabled selected>System</option>
                {systems.map(system => (
                  <option key={system.id} value={system.name}>{system.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default GameChallengesPage;