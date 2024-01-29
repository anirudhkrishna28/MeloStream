// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PlaylistPage } from './components/PlaylistPage';
import Song from './components/song';
import Albums from './components/Albums';
import Search from './components/Search';
import Home from './components/Home';
import { Auth } from './components/Auth';

const App = () => {
      return (
    <Router>
      <Routes>
      <Route path="/auth" element={<Auth />} />
        <Route path="/playlists" element={<PlaylistPage />} />
        <Route path="/songs" element={<Song />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
  
};

export default App;



