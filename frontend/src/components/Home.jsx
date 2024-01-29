import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Song from './song';
import { GetUserID } from "./GetUserId";
import SongAlbum from './SongAlbum';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './Inner.css';
// import { Bars } from 'react-loader-spinner';
import Bars from './Bars';

const Home = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [history, setHistory] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const requestData = {"userId":GetUserID()}
  console.log(requestData);

  const fetchTopSongs = async () => {
    try {
      const response = await axios.post('/api/top', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setTopSongs(response.data);
    } catch (error) {
      console.error('Error fetching top songs:', error);
    }
  };

  const fetchHistory = async () => {
    try {
     
      const response = await fetch("/data/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      console.log(response);
      const data = await response.json();
      console.log(data[0].history);
      setHistory(data[0].history);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await fetch("/data/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      setPlaylists(data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const createPlaylist = async () => {
    console.log(newPlaylistName);
    const album = {"userId":GetUserID(),"name":newPlaylistName,"songs":[]}
    try {
      const response = await axios.post('/data/createPlaylist', album);

      console.log(response);

      setNewPlaylistName('');
      fetchPlaylists();  // Refresh the playlists after creating a new one
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const renderLoader = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30vh',
      }}
    >
      
      <Bars />
    </div>

  );

  
  const navigate = useNavigate();

  const handlePlaylistClick = (data) => {
    // Navigate to the individual playlist (you can replace '/song' with your desired path)
    navigate(`/songs`,{state:data});
   };

  useEffect(() => {
    fetchTopSongs();
    fetchHistory();
    fetchPlaylists();
  }, []);

  return (
    <div className='content'>
      <NavBar />
      <div className='main'>
      <h1>Create a playlist</h1>
      <input
        type="text"
        value={newPlaylistName}
        onChange={(e) => setNewPlaylistName(e.target.value)}
        placeholder="Playlist Name"
      />
      <button onClick={createPlaylist}>Create Playlist</button>
      <h1>Top Songs</h1>
      
      </div>
      {topSongs.length > 0?(<ul>
        <SongAlbum songs={topSongs} />
      </ul>):(renderLoader())}
      

      <div className='main'>
      <h1>History</h1>
      </div>
      <ul>
        <SongAlbum songs={history} />
      </ul>
      <div className='main'>
      <h1>Playlists</h1>  

      <div className='play-list'>
      <ul>
  {playlists.map((playlist) => (
    <div key={playlist._id} onClick={() => handlePlaylistClick({"songs":playlist.songs,"name":playlist.name})} className='playlist-item'>
      <h3>{playlist.name}</h3>
      {playlist.songs.length > 0 ? (
        <img src={playlist.songs[0].image} alt={`Image for ${playlist.name}`} />
      ) : (
        <p>No songs in this playlist</p>
      )}
      {/* You can display other information about the playlist here */}
    </div>
  ))}
</ul>
</div>
</div> 
    </div>
  );
};

export default Home;