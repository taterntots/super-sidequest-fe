import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchChallenges,
  fetchChallengesByPopularity,
  fetchChallengesByExpiration,
  challengeSelector
} from '../features/challenge/challengeSlice';

// COMPONENTS
import GameChallengeSearchPage from './GameChallengeSearchPage';

// ----------------------------------------------------------------------------------
// ------------------------------ ALL CHALLENGE DETAILS -----------------------------
// ----------------------------------------------------------------------------------

const AllChallengeDetails = ({ searchTerm, refresh, handleClearSearchBar }) => {
  const dispatch = useDispatch();
  const { challenges, popular_challenges, expire_challenges } = useSelector(challengeSelector);
  const [filteredChallenges, setFilteredChallenges] = useState(challenges);
  const [filteredPopularChallenges, setFilteredPopularChallenges] = useState(challenges);
  const [filteredExpireChallenges, setFilteredExpireChallenges] = useState(challenges);

  // Grabs all necessary data from server
  useEffect(() => {
    dispatch(fetchChallenges())
    dispatch(fetchChallengesByPopularity())
    dispatch(fetchChallengesByExpiration())
  }, [dispatch, refresh])

  // Resets filter when clicking away from page
  useEffect(() => {
    setFilteredChallenges(challenges)
    setFilteredPopularChallenges(popular_challenges)
    setFilteredExpireChallenges(expire_challenges)
  }, [challenges, popular_challenges, expire_challenges])

  return (
    <>
      {/* RENDERS GAME CHALLENGES SEARCH PAGE */}
      <div>
        <GameChallengeSearchPage
          challenges={challenges}
          popular_challenges={popular_challenges}
          expire_challenges={expire_challenges}
          filteredChallenges={filteredChallenges}
          filteredPopularChallenges={filteredPopularChallenges}
          filteredExpireChallenges={filteredExpireChallenges}
          setFilteredChallenges={setFilteredChallenges}
          setFilteredPopularChallenges={setFilteredPopularChallenges}
          setFilteredExpireChallenges={setFilteredExpireChallenges}
          searchTerm={searchTerm}
          handleClearSearchBar={handleClearSearchBar}
        />
      </div>
    </>
  );
}

export default AllChallengeDetails;