import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchChallenges,
  fetchChallengesByPopularity,
  challengeSelector
} from '../features/challenge/challengeSlice';

// COMPONENTS
import GameChallengesPage from './GameChallengesPage';

// ----------------------------------------------------------------------------------
// ------------------------------ ALL CHALLENGE DETAILS -----------------------------
// ----------------------------------------------------------------------------------

const AllChallengeDetails = ({ searchTerm, refresh, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const { challenges, popular_challenges } = useSelector(challengeSelector);
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);
  const [filteredPopularChallenges, setFilteredPopularChallenges] = useState(challenges);

  // Grabs all necessary data from server
  useEffect(() => {
    dispatch(fetchChallenges())
    dispatch(fetchChallengesByPopularity())
  }, [dispatch, refresh])

  // Resets filter when clicking away from page
  useEffect(() => {
    setFilteredChallenges(challenges)
    setFilteredPopularChallenges(popular_challenges)
  }, [challenges, popular_challenges])

  return (
    <>
      {/* RENDERS GAME CHALLENGES SEARCH PAGE */}
      <div>
        <GameChallengesPage
          challenges={challenges}
          popular_challenges={popular_challenges}
          filteredChallenges={filteredChallenges}
          filteredPopularChallenges={filteredPopularChallenges}
          setFilteredChallenges={setFilteredChallenges}
          setFilteredPopularChallenges={setFilteredPopularChallenges}
          searchTerm={searchTerm}
          handleClearSearchBar={handleClearSearchBar}
        />
      </div>
    </>
  );
}

export default AllChallengeDetails;