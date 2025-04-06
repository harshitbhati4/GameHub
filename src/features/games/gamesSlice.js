import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_RAWG_API_KEY;

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async ({ page = 1, search = '', filters = {} }, { rejectWithValue }) => {
    try {
      const { genres, tags, dates, ordering } = filters;
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&search=${search}&genres=${genres}&tags=${tags}&dates=${dates}&ordering=${ordering}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    status: 'idle',
    error: null,
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    searchQuery: '',
    filters: {
      genres: '',
      tags: '',
      dates: '',
      ordering: ''
    }
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = {
        genres: '',
        tags: '',
        dates: '',
        ordering: ''
      };
      state.currentPage = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.games = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { 
  setCurrentPage, 
  setSearchQuery, 
  setFilters, 
  clearFilters 
} = gamesSlice.actions;

export default gamesSlice.reducer;