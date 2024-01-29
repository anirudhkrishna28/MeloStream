// Song.jsx

import React, { useState, useEffect } from 'react';
import './Inner.css';
import { GetUserID } from './GetUserId';
import MoreDetails from './MoreDetails';
import AudioPlayer from './AudioPlayer';

const SongAlbum = (props) => {
  console.log(props);
  // const [songs, setSongs] = useState(props.songs);
  const songs = props.songs // Corrected line
  console.log(songs);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [songClicked,setSongClicked] =  useState(false)
   useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/data/playlists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: GetUserID(),
          }),
        });
    
        const data = await response.json();
        console.log(data);
        setPlaylists(data);
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
        const response = await fetch('/data/addSong', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: GetUserID(),
            song,
            name,
          }),
        });
  
        const data = await response.json();
        console.log(data.message);
        // Optionally, you can provide feedback to the user based on the response
      } else {
        console.log('Please select a playlist');
      }
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };
  

  // State to track the currently playing song
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    // Automatically start playing the first song when the component mounts
    if (songs.length > 0 && !currentSong) {
      setCurrentSong({});
    }
  }, [songs, currentSong]);

  const handleSongClick = (song) => {
    // Play the clicked song
    setSongClicked(true)
    setCurrentSong({ ...song });
  };

  return (
    <>
    {/* <div className='menu-bar'></div> */}
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

        // console.log("sSs",songs);

        return (
          <div className='song-block' key={songTitle}>
              <div className='song-sub'>
                <img src={image} alt={songTitle} />
                <div className='song-details'>
                  <div className='song-run'>
                    <h2>{songTitle}</h2>
                    
                    {/* <div onClick={() => delSong(song)}>Delete song</div> */}
                    <button onClick={() => handleSongClick(song)} className='play-button'><i className="fas fa-play"></i></button>
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
        {songClicked?(<AudioPlayer currentSong={currentSong || {}
        } />):(<></>)}
        
      </div>
    </>
  );
};

export default SongAlbum;
