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
// --------------------------------- PROFILE PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const ChallengesPage = ({ accepted_challenges, created_challenges, completed_challenges, filteredCreatedChallenges, filteredAcceptedChallenges, filteredCompletedChallenges, setFilteredCreatedChallenges, setFilteredAcceptedChallenges, setFilteredCompletedChallenges, searchTerm, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const { difficulties } = useSelector(difficultySelector);
  const { systems } = useSelector(systemSelector)
  const [currentChallengeFilter, setCurrentChallengeFilter] = useState('Created')

  // Grabs filterable data from the server
  useEffect(() => {
    dispatch(fetchDifficulties())
    dispatch(fetchSystems())
  }, [dispatch])

  // Filter all challenges
  const filterReset = () => {
    setFilteredCreatedChallenges(created_challenges)
    setFilteredAcceptedChallenges(accepted_challenges)
    setFilteredCompletedChallenges(completed_challenges)
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

    if (currentChallengeFilter === 'Created') {
      var filtered = created_challenges.filter(fc => {
        if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select') {
          return fc.system === selectedSystemValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue && fc.system === selectedSystemValue
        }
      })
      setFilteredCreatedChallenges(filtered)
    } else if (currentChallengeFilter === 'Active') {
      var filtered = accepted_challenges.filter(fc => {
        if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select') {
          return fc.system === selectedSystemValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue && fc.system === selectedSystemValue
        }
      })
      setFilteredAcceptedChallenges(filtered)
    } else if (currentChallengeFilter === 'Completed') {
      var filtered = completed_challenges.filter(fc => {
        if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select') {
          return fc.system === selectedSystemValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue && fc.system === selectedSystemValue
        }
      })
      setFilteredCompletedChallenges(filtered)
    }
  }

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
        {/* CHALLENGE LIST */}
        <div className="mr-3 w-full lg:w-4/5 h-full pb-4 px-10 bg-profileone rounded-lg text-white">
          <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
            {currentChallengeFilter === 'Created' ? 'Created Quests' :
              currentChallengeFilter === 'Active' ? 'Active Quests' :
                currentChallengeFilter === 'Completed' ? 'Completed Quests' :
                  null
            }
          </h1>
          <ChallengeList
            challenges={
              currentChallengeFilter === 'Created' ? filteredCreatedChallenges :
                currentChallengeFilter === 'Active' ? filteredAcceptedChallenges :
                  currentChallengeFilter === 'Completed' ? filteredCompletedChallenges :
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
                className={currentChallengeFilter === 'Created' ?
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profiletwo hover:bg-white hover:text-profiletwo focus:outline-none transition duration-150 ease-in-out" :
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-gray-700 hover:bg-white hover:text-profiletwo focus:outline-none transition duration-150 ease-in-out"}
                onClick={() => {
                  setCurrentChallengeFilter('Created')
                  filterReset()
                  handleClearSearchBar()
                }}
              >
                Created
              </button>
              <button
                className={currentChallengeFilter === 'Active' ?
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profiletwo hover:bg-white hover:text-profiletwo focus:outline-none transition duration-150 ease-in-out" :
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-gray-700 hover:bg-white hover:text-profiletwo focus:outline-none transition duration-150 ease-in-out"} onClick={() => {
                    setCurrentChallengeFilter('Active')
                    filterReset()
                    handleClearSearchBar()
                  }}
              >
                Active
              </button>
              <button
                className={currentChallengeFilter === 'Completed' ?
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profiletwo hover:bg-white hover:text-profiletwo focus:outline-none transition duration-150 ease-in-out" :
                  "items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-gray-700 hover:bg-white hover:text-profiletwo focus:outline-none transition duration-150 ease-in-out"}
                onClick={() => {
                  setCurrentChallengeFilter('Completed')
                  filterReset()
                  handleClearSearchBar()
                }}
              >
                Completed
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

export default ChallengesPage;