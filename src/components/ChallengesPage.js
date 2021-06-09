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
      <div className="lg:flex justify-between">

        {/* CHALLENGE LIST */}
        <div className="mr-3 w-full lg:w-4/5 h-full pb-4 px-10 bg-profileone rounded-lg text-white">
          <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
            Challenges
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

        {/* CHALLENGE STATUS */}
        <div className='w-full lg:w-1/5'>
          <div className="px-10 mb-3 pb-4 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Status
            </h1>
            <div className='flex flex-col'>
              <button
                onClick={() => {
                  setCurrentChallengeFilter('Created')
                  filterReset()
                  handleClearSearchBar()
                }}
              >
                Created
              </button>
              <button
                onClick={() => {
                  setCurrentChallengeFilter('Active')
                  filterReset()
                  handleClearSearchBar()
                }}
              >
                Active
              </button>
              <button
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
          <div className="px-10 pb-4 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Filter By
            </h1>
            <div className='flex flex-col'>
              <button
                onClick={filterReset}
              >
                ALL
              </button>
              <select name='difficulty' id='difficultyBox' onChange={filterMaster} className='text-black'>
                <option value='Select' disabled selected>Difficulty</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.name}>{difficulty.name}</option>
                ))}
              </select>
              <select name='system' id='systemBox' onChange={filterMaster} className='text-black'>
                <option value='Select' disabled selected>System</option>
                {systems.map(system => (
                  <option key={system.id} value={system.name}>{system.name}</option>
                ))}
              </select>
            </div>
            {/* FIXES WEIRD MARGIN ISSUE WHEN IN MOBILE VIEW */}
            <div className='invisible pt-1' />
          </div>
        </div>
      </div >
    </>
  );
}

export default ChallengesPage;