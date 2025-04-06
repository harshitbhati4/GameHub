import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = process.env.REACT_APP_RAWG_API_KEY;

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api' }),
  endpoints: (builder) => ({
    getGameDetails: builder.query({
      query: (id) => `games/${id}?key=${API_KEY}`,
    }),
    getGameScreenshots: builder.query({
      query: (id) => `games/${id}/screenshots?key=${API_KEY}`,
    }),
    getGameSeries: builder.query({
      query: (id) => `games/${id}/game-series?key=${API_KEY}`,
    }),
  }),
});

export const { 
  useGetGameDetailsQuery, 
  useGetGameScreenshotsQuery,
  useGetGameSeriesQuery 
} = gamesApi;