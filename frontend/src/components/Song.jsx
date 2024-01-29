import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import MusicPlayer from './MusicPlayer'; 
import MoreDetails from './MoreDetails';
import { GetUserID } from './GetUserId';
import NavBar from './NavBar';
import AudioPlayer from './AudioPlayer';

const Song = () => {
  const location = useLocation();
  const [currentSong, setCurrentSong] = useState(null);
  const [songs, setSongs] = useState(location.state.songs);
  const albumname = location.state?.name || "";
  console.log(songs);
  console.log(albumname);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.post('/data/playlists', {
          userId: GetUserID(),
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []); // Empty dependency array to ensure the effect runs only once

  const addToPlaylist = async (song) => {
    try {
      if (selectedPlaylist) {
        const { _id, name } = selectedPlaylist;
        const response = await axios.post('/data/addSong', {
          userId: GetUserID(),
          song,
          name,
        });
  
        console.log(response.data.message);
        // Optionally, you can provide feedback to the user based on the response
      } else {
        console.log('Please select a playlist');
      }
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  const delSong = async (song) => {
    try {
      const requestData = { userId: GetUserID(), song, name: albumname };
      console.log(requestData);
      const response = await fetch('/data/deleteSong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      console.log('Delete song response:', data);
  
      setSongs((prevSongs) => prevSongs.filter((s) => s.song !== song.song));
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  const handleSongClick = (song) => {
    setCurrentSong({ ...song });
  };

  return (
    <>
      
    <NavBar />
      <div className='song-list'>
        {songs.map((song) => {
          const {
            song: songTitle,
            primary_artists,
            year,
            duration,
            image,
            singers,
            release_date,
            language,
            song_url,
            album_url,
          } = song;

          return (
            <div className='song-block' key={songTitle}>
              <div className='song-sub'>
                <img src={image} alt={songTitle} />
                <div className='song-details'>
                  <div className='song-run'>
                    <h2>{songTitle}</h2>
                    
                    <button onClick={() => handleSongClick(song)} className='play-button'><i className="fas fa-play"></i></button>
                    <div onClick={() => delSong(song)} className='delete-button'><i class="fa-solid fa-trash-can"></i></div>
                    <MoreDetails song={song}/>
                  </div>
                  <p>{primary_artists}</p>
                  <p>Year: {year}</p>
                  <p>Duration: {duration} seconds</p>
                  <div>
                      <p>Select Playlist:</p>
                      <select
                        value={selectedPlaylist ? selectedPlaylist._id : ''}
                        onChange={(e) => {
                          const playlistId = e.target.value;
                          const selected = playlists.find((playlist) => playlist._id === playlistId);
                          setSelectedPlaylist(selected);
                        }}
                        className='add-playlist-button'
                      >
                        <option value="">Select a playlist</option>
                        {playlists.map((playlist) => (
                          <option key={playlist._id} value={playlist._id}>
                            {playlist.name}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => addToPlaylist(song)} className='add-playlist-button'>Add to Playlist</button>
                    </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* Music player at the bottom */}
        <AudioPlayer currentSong={currentSong || {}
        } />
      </div>
    </>
  );
};

export default Song;