import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import challengeReducer from '../features/challenge/challengeSlice';
import gameReducer from '../features/game/gameSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    challenges: challengeReducer,
    games: gameReducer
  },
});
