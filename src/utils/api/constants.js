export const API_ENDPOINTS = {
    GAMES: '/games',
    GAME_DETAILS: (id) => `/games/${id}`,
    GAME_SCREENSHOTS: (id) => `/games/${id}/screenshots`,
    GAME_SERIES: (id) => `/games/${id}/game-series`,
    GENRES: '/genres',
    TAGS: '/tags',
    PLATFORMS: '/platforms'
  };
  
  export const DEFAULT_PAGE_SIZE = 20;
  
  export const ORDERING_OPTIONS = [
    { value: '', label: 'Relevance' },
    { value: '-added', label: 'Popularity' },
    { value: '-released', label: 'Release Date' },
    { value: '-metacritic', label: 'Metacritic Score' },
    { value: '-rating', label: 'Average Rating' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: '-name', label: 'Name (Z-A)' }
  ];
  
  export const DATE_RANGES = [
    { value: '', label: 'All Time' },
    { value: '2020-01-01,2023-12-31', label: '2020-2023' },
    { value: '2010-01-01,2019-12-31', label: '2010-2019' },
    { value: '2000-01-01,2009-12-31', label: '2000-2009' },
    { value: '1990-01-01,1999-12-31', label: '1990-1999' }
  ];