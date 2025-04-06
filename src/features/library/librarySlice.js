import { createSlice } from '@reduxjs/toolkit';

const loadLibraryFromLocalStorage = () => {
  try {
    const serializedLibrary = localStorage.getItem('gameLibrary');
    return serializedLibrary ? JSON.parse(serializedLibrary) : [];
  } catch (e) {
    return [];
  }
};

const librarySlice = createSlice({
  name: 'library',
  initialState: {
    games: loadLibraryFromLocalStorage()
  },
  reducers: {
    addToLibrary: (state, action) => {
      if (!state.games.some(game => game.id === action.payload.id)) {
        state.games.push(action.payload);
        localStorage.setItem('gameLibrary', JSON.stringify(state.games));
      }
    },
    removeFromLibrary: (state, action) => {
      state.games = state.games.filter(game => game.id !== action.payload);
      localStorage.setItem('gameLibrary', JSON.stringify(state.games));
    }
  }
});

export const { addToLibrary, removeFromLibrary } = librarySlice.actions;
export default librarySlice.reducer;