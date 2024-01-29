// SearchContext.js
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [topQueries, setTopQueries] = useState([]);

  const state = {
    searchTerm,
    setSearchTerm,
    songs,
    setSongs,
    albums,
    setAlbums,
    topQueries,
    setTopQueries,
  };

  return <SearchContext.Provider value={state}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
