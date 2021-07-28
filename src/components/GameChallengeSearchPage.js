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

// UTILS
import moment from 'moment';

// COMPONENTS
import ChallengeList from '../features/challenge/ChallengeList';

// ----------------------------------------------------------------------------------
// --------------------------- GAME CHALLENGES SEARCH PAGE --------------------------
// ----------------------------------------------------------------------------------

const GameChallengeSearchPage = ({ challenges, popular_challenges, expire_challenges, filteredChallenges, filteredPopularChallenges, filteredExpireChallenges, setFilteredChallenges, setFilteredPopularChallenges, setFilteredExpireChallenges, searchTerm, handleClearSearchBar }) => {
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
    setFilteredExpireChallenges(expire_challenges)
    var selectBox = document.getElementById("difficultyBox");
    selectBox.selectedIndex = 0;
    var selectBox = document.getElementById("systemBox");
    selectBox.selectedIndex = 0;
    var expiredBox = document.getElementById("expiredBox");
    expiredBox.checked = false;
  }

  // Filter master
  const filterMaster = () => {
    var systemBox = document.getElementById("systemBox");
    var difficultyBox = document.getElementById("difficultyBox");
    var expiredBox = document.getElementById("expiredBox");
    var selectedSystemValue = systemBox.options[systemBox.selectedIndex].value;
    var selectedDifficultyValue = difficultyBox.options[difficultyBox.selectedIndex].value;
    var selectedExpiredValue = expiredBox.checked;

    // First, filter game challenges by whether or not they are still active (not passed the end date)
    var filterByExpired = challenges.filter(fc => {
      if (selectedExpiredValue) {
        return moment(fc.end_date).isAfter() || !fc.end_date // Accounts for challenges without end_dates
      } else {
        return challenges
      }
    })
    var filterByPopularExpired = popular_challenges.filter(fc => {
      if (selectedExpiredValue) {
        return moment(fc.end_date).isAfter() || !fc.end_date // Accounts for challenges without end_dates
      } else {
        return popular_challenges
      }
    })
    var filterByTimeLeftExpired = expire_challenges.filter(fc => {
      if (selectedExpiredValue) {
        return moment(fc.end_date).isAfter() || !fc.end_date // Accounts for challenges without end_dates
      } else {
        return expire_challenges
      }
    })

    // Second, filter through challenges already organized by our expiration bool
    if (currentChallengeFilter === 'All') {
      var filtered = filterByExpired.filter(fc => {
        if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select') {
          return fc.system === selectedSystemValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue && fc.system === selectedSystemValue
        }
      })

      // Third, determine what to return depending on whether nothing is selected in filters, else simply return the filtered list
      if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && !selectedExpiredValue) {
        setFilteredChallenges(challenges)
      } else if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && selectedExpiredValue) {
        setFilteredChallenges(filterByExpired)
      } else {
        setFilteredChallenges(filtered)
      }

    } else if (currentChallengeFilter === 'Popular') {
      var filtered = filterByPopularExpired.filter(fc => {
        if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select') {
          return fc.system === selectedSystemValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue && fc.system === selectedSystemValue
        }
      })
      if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && !selectedExpiredValue) {
        setFilteredPopularChallenges(popular_challenges)
      } else if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && selectedExpiredValue) {
        setFilteredPopularChallenges(filterByPopularExpired)
      } else {
        setFilteredPopularChallenges(filtered)
      }

    } else if (currentChallengeFilter === 'Expire') {
      var filtered = filterByTimeLeftExpired.filter(fc => {
        if (selectedSystemValue === 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue === 'Select') {
          return fc.system === selectedSystemValue
        } else if (selectedSystemValue !== 'Select' && selectedDifficultyValue !== 'Select') {
          return fc.difficulty === selectedDifficultyValue && fc.system === selectedSystemValue
        }
      })
      if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && !selectedExpiredValue) {
        setFilteredExpireChallenges(expire_challenges)
      } else if (selectedSystemValue === 'Select' && selectedDifficultyValue === 'Select' && selectedExpiredValue) {
        setFilteredExpireChallenges(filterByTimeLeftExpired)
      } else {
        setFilteredExpireChallenges(filtered)
      }
    }
  }

  return (
    <div className='p-4 rounded-tr-md bg-profileone rounded-b-md'>
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
        {/* CHALLENGE LIST */}
        <div className="mr-3 w-full lg:w-4/5 h-full pb-4 px-10 bg-profiletwo rounded-lg text-white">
          <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
            All Quests
          </h1>
          {filteredChallenges.length === 0 ? (
            <div className='text-center text-white'>
              <p className='text-lg leading-6'>
                There are currently no quests for this game
              </p>
            </div>
          ) : null}

          <ChallengeList
            challenges={
              currentChallengeFilter === 'All' ? filteredChallenges :
                currentChallengeFilter === 'Popular' ? filteredPopularChallenges :
                  currentChallengeFilter === 'Expire' ? filteredExpireChallenges :
                    null}
            searchTerm={searchTerm}
            handleClearSearchBar={handleClearSearchBar}
          />
        </div>

        {/* CHALLENGE TYPE */}
        <div className='w-full lg:w-1/5'>
          <div className="px-10 mb-3 pb-4 bg-profiletwo rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 lg:my-0'>
              Sort By
            </h1>
            <div className='flex flex-col'>
              <button
                className={currentChallengeFilter === 'All' ?
                  'items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profileone focus:outline-none transition duration-150 ease-in-out' :
                  'items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:outline-none transition duration-150 ease-in-out'}
                onClick={() => {
                  setCurrentChallengeFilter('All')
                  filterReset()
                  handleClearSearchBar()
                }}
              >
                Recent
              </button>
              <button
                className={currentChallengeFilter === 'Popular' ?
                  'items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-profileone focus:outline-none transition duration-150 ease-in-out' :
                  'items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:outline-none transition duration-150 ease-in-out'}
                onClick={() => {
                  setCurrentChallengeFilter('Popular')
                  filterReset()
                  handleClearSearchBar()
                }}
              >
                Popular
              </button>
              <button
                className={currentChallengeFilter === 'Expire' ?
                  'items-center rounded-lg text-lg py-2 text-center font-medium bg-profileone focus:outline-none transition duration-150 ease-in-out' :
                  'items-center rounded-lg text-lg py-2 text-center font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:outline-none transition duration-150 ease-in-out'}
                onClick={() => {
                  setCurrentChallengeFilter('Expire')
                  filterReset()
                  handleClearSearchBar()
                }}
              >
                Time Left
              </button>
            </div>
          </div>

          {/* FILTERS */}
          <div className="px-10 pb-4 mb-3 lg:mb-0 bg-profiletwo rounded-lg text-white">
            <h1 className='text-center text-2xl font-medium py-4 mt-4 lg:my-0'>
              Filter By
            </h1>
            <div className='flex flex-col'>
              <button
                onClick={() => {
                  filterReset()
                  handleClearSearchBar()
                }}
                className={`items-center rounded-lg text-lg mb-4 py-2 text-center font-medium bg-graybutton hover:bg-white hover:text-graybutton focus:outline-none transition duration-150 ease-in-out`}
              >
                Reset
              </button>
              <select name='difficulty' id='difficultyBox' onChange={filterMaster} className='mb-4 text-black px-1 rounded-md'>
                <option value='Select' disabled selected>Difficulty</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.name}>{difficulty.name}</option>
                ))}
              </select>
              <select name='system' id='systemBox' onChange={filterMaster} className='mb-4 text-black px-1 rounded-md'>
                <option value='Select' disabled selected>System</option>
                {systems.map(system => (
                  <option key={system.id} value={system.name}>{system.name}</option>
                ))}
              </select>
              <div className='flex justify-evenly'>
                <p className='text-lg font-medium'>
                  Active
                </p>
                <input
                  name='is_expired'
                  id='expiredBox'
                  type='checkbox'
                  className='w-6 h-6 self-center'
                  onClick={filterMaster}
                />
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  );
}

export default GameChallengeSearchPage;