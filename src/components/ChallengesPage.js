import React, { useState, useEffect } from 'react';

// STATE
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDifficulties,
  difficultySelector
} from '../features/difficulty/difficultySlice';

// COMPONENTS
import ChallengeList from '../features/challenge/ChallengeList';

// ----------------------------------------------------------------------------------
// --------------------------------- PROFILE PAGE -----------------------------------
// ----------------------------------------------------------------------------------

const ChallengesPage = ({ accepted_challenges, created_challenges, completed_challenges, filteredCreatedChallenges, filteredAcceptedChallenges, filteredCompletedChallenges, setFilteredCreatedChallenges, setFilteredAcceptedChallenges, setFilteredCompletedChallenges, searchTerm, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const { difficulties } = useSelector(difficultySelector);
  const [currentChallengeFilter, setCurrentChallengeFilter] = useState('Created')

  // Grabs filterable data from the server
  useEffect(() => {
    dispatch(fetchDifficulties())
  }, [dispatch])

  // Filter all challenges
  const filterByAll = () => {
    setFilteredCreatedChallenges(created_challenges)
    setFilteredAcceptedChallenges(accepted_challenges)
    setFilteredCompletedChallenges(completed_challenges)
    var selectBox = document.getElementById("difficultyBox");
    selectBox.selectedIndex = 0;
  }

  // Filter by difficulty
  const filterByDifficulty = () => {
    var selectBox = document.getElementById("difficultyBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if (currentChallengeFilter === 'Created') {
      var filtered = created_challenges.filter(fc => fc.difficulty === selectedValue)
      setFilteredCreatedChallenges(filtered)
    } else if (currentChallengeFilter === 'Active') {
      var filtered = accepted_challenges.filter(fc => fc.difficulty === selectedValue)
      setFilteredAcceptedChallenges(filtered)
    } else if (currentChallengeFilter === 'Completed') {
      var filtered = completed_challenges.filter(fc => fc.difficulty === selectedValue)
      setFilteredCompletedChallenges(filtered)
    }
  }

  // Reset all filters
  const resetAllFilters = () => {
    setFilteredCreatedChallenges(created_challenges)
    setFilteredAcceptedChallenges(accepted_challenges)
    setFilteredCompletedChallenges(completed_challenges)
    var selectBox = document.getElementById("difficultyBox");
    selectBox.selectedIndex = 0;
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

        {/* FILTER */}
        <div className='w-full lg:w-1/5'>
          <div className="px-10 mb-3 pb-4 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Filter By
            </h1>
            <div className='flex flex-col'>
              <button
                onClick={() => {
                  setCurrentChallengeFilter('Created')
                  resetAllFilters()
                  handleClearSearchBar()
                }}
              >
                Created
              </button>
              <button
                onClick={() => {
                  setCurrentChallengeFilter('Active')
                  resetAllFilters()
                  handleClearSearchBar()
                }}
              >
                Active
              </button>
              <button
                onClick={() => {
                  setCurrentChallengeFilter('Completed')
                  resetAllFilters()
                  handleClearSearchBar()
                }}
              >
                Completed
              </button>
            </div>
          </div>

          {/* ACTIVE CHALLENGES */}
          <div className="px-10 bg-profileone rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Search
            </h1>
            <button onClick={filterByAll} className='mr-0 md:mr-10 hover:text-mcgreen'>ALL</button>
            <select name='difficulty' id='difficultyBox' onChange={filterByDifficulty} className='mr-0 md:mr-10 text-black hover:text-mcgreen'>
              <option value='Select' disabled selected>Difficulty</option>
              {difficulties.map(difficulty => (
                <option value={difficulty.name}>{difficulty.name}</option>
              ))}
            </select>
            {/* FIXES WEIRD MARGIN ISSUE WHEN IN MOBILE VIEW */}
            <div className='invisible pt-1' />
          </div>
        </div>
      </div >
    </>
  );
}

export default ChallengesPage;