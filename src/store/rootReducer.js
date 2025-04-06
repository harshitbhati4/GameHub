import { combineReducers } from '@reduxjs/toolkit';
import gamesReducer from '../features/games/gamesSlice';
import libraryReducer from '../features/library/librarySlice';
import userReducer from '../features/user/userSlice';
import { gamesApi } from '../features/games/gamesApi';

const rootReducer = combineReducers({
  games: gamesReducer,
  library: libraryReducer,
  user: userReducer,
  [gamesApi.reducerPath]: gamesApi.reducer
});

export default rootReducer;