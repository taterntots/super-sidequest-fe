import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import challengeReducer from '../features/challenge/challengeSlice';
import gameReducer from '../features/game/gameSlice';
import difficultiesReducer from '../features/difficulty/difficultySlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    challenges: challengeReducer,
    games: gameReducer,
    difficulties: difficultiesReducer
  },
});
