import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SongAlbum from './SongAlbum';
import NavBar from './NavBar';
import Bars from './Bars';

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [topQueries, setTopQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestData = {
    "songname": searchTerm,
  };

  const handleSearch = async () => {
    try {
      setLoading(true); // Set loading to true when starting the search

      const songsResponse = await fetch(`/api/songs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const albumsResponse = await fetch(`/api/album`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const topQueriesResponse = await fetch(`/api/topQuery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const songsData = await songsResponse.json();
      const albumsData = await albumsResponse.json();
      const topQueriesData = await topQueriesResponse.json();

      setSongs(songsData);
      setAlbums(albumsData);
      setTopQueries(topQueriesData);
      console.log(songsData);
      console.log(albumsData);
      console.log(topQueriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  const renderLoader = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30vh',
        // color: 'black',
      }}
    >
      
      <Bars />
    </div>

  );

  const renderSongs = () => (
    <div>
      <div className='search-title'>
      <h2>Songs</h2>
      </div>
      <SongAlbum songs={songs} />
    </div>
  );

  const handleAlbumClick = (perma_url) => {
    navigate('/albums', { state: { perma_url: perma_url } });
  };

  const renderAlbums = () => (
    <div className='search-album'>
    <div className='search-title'>
      <h2>Albums</h2>
      </div>
      <div className='search-list'>
      {albums.map((album) => (
        <div key={album.id} onClick={() => handleAlbumClick(album.perma_url)} className='search-item'>
          <h3>{album.title}</h3>
          <p>Music: {album.more_info.music}</p>
          <p>Year: {album.more_info.year}</p>
          {/* Add more album details as needed */}
        </div>
      ))}
    </div>
    </div>
  );


  return (
    <>
    
    <NavBar />
    <div className='search-result'>
      <div className='search-bar'>
      <p>Hi There <span>User,</span></p>
      <input
        type="text"
        placeholder="Search for music..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      <button onClick={handleSearch}>Search</button>
      </div>
      
      {/* {loading ? renderLoader() : null} */}
      {loading ? (<h1 style={{marginLeft:'15%',color:'#C2D9FF'}}>Songs</h1>) : null}
      {loading ? (renderLoader()) : renderSongs()}
      {loading ? (<h1 style={{marginLeft:'15%',color:'#C2D9FF'}}>Albums</h1>) : null}
      {loading ? renderLoader() : renderAlbums()}


    </div>
    </>
  );
};

export default Search;