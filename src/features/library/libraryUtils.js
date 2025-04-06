export const saveLibraryToLocalStorage = (library) => {
    try {
      const serializedLibrary = JSON.stringify(library);
      localStorage.setItem('gameLibrary', serializedLibrary);
    } catch (error) {
      console.error('Error saving library to localStorage:', error);
    }
  };
  
  export const loadLibraryFromLocalStorage = () => {
    try {
      const serializedLibrary = localStorage.getItem('gameLibrary');
      return serializedLibrary ? JSON.parse(serializedLibrary) : [];
    } catch (error) {
      console.error('Error loading library from localStorage:', error);
      return [];
    }
  };
  
  export const isGameInLibrary = (library, gameId) => {
    return library.some(game => game.id === gameId);
  };
  
  export const getLibraryStats = (library) => {
    const totalGames = library.length;
    const totalPlaytime = library.reduce((sum, game) => sum + (game.playtime || 0), 0);
    const averageRating = library.length > 0 
      ? library.reduce((sum, game) => sum + (game.rating || 0), 0) / library.length 
      : 0;
  
    return {
      totalGames,
      totalPlaytime,
      averageRating: parseFloat(averageRating.toFixed(2))
    };
  };