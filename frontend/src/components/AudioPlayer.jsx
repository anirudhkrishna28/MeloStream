import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { GetUserID } from './GetUserId';
import './inner.css'; // You can add your own CSS for styling

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const AudioPlayer = ({ currentSong }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('durationchange', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('durationchange', updateDuration);
    };
  }, []);

  useEffect(() => {
    // When currentSong changes, autoplay the audio
    if (currentSong) {
      audioRef.current.play();
      setIsPlaying(true);
      // Add the current song to history when played
      addHistory(currentSong);
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    audioRef.current.volume = value;
  };

  const handleSeekChange = (e) => {
    const value = parseFloat(e.target.value);
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  };

  const addHistory = async (song) => {
    try {
      setIsLoading(true);
      setError(null);

      // Make an API call to add the song to the user's history
      const response = await axios.post('/data/addHistory', {
        userId: GetUserID(),
        song,
      });

      console.log(response.data.message);
      // Optionally, you can provide feedback to the user based on the response

      setIsLoading(false);
    } catch (error) {
      console.error('Error adding song to history:', error);
      setError('Error adding song to history');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="music-player">
        <div className="pulser">
          <img src={currentSong.image} alt={currentSong.song} className="album-cover" />
        </div>
        <div className="song-info">
          <p className="song-name">{currentSong.song}</p>
          <p className="artist">{currentSong.primary_artists}</p>
        </div>
        <audio ref={audioRef} src={currentSong.media_url}></audio>
        <div className="play-bar">
          <div className="controls">
            <button onClick={togglePlayPause} className="play-pause-button">
              {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
            </button>
            <span className="timing">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              step={1}
              value={currentTime}
              onChange={handleSeekChange}
            />
            <span className="timing">{formatTime(duration)}</span>
          </div>
          <div className="volume-control">
            <span role="img" aria-label="volume">
              🔊
            </span>
            <span></span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
