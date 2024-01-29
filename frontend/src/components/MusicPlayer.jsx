import React, { useState, useEffect } from 'react';
import './Inner.css';
import AudioPlayer from './AudioPlayer';

const MusicPlayer = ({ songs, currentSong, onPrevious, onNext }) => {
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentSong) {
      audio.src = currentSong.media_url;
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('durationchange', updateDuration);
      if (isPlaying) {
        audio.play();
      }
    }

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('durationchange', updateDuration);
    };
  }, [currentSong, audio, isPlaying]);

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex((song) => song === currentSong);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    onPrevious(songs[previousIndex]);
    setIsPlaying(false); // Reset isPlaying to false
  };

  const handleNext = () => {
    if (songs && songs.length > 0 && currentSong) {
      const currentIndex = songs.findIndex((song) => song === currentSong);
      const nextIndex = (currentIndex + 1) % songs.length;
      onNext(songs[nextIndex]);
      setIsPlaying(false); // Reset isPlaying to false
    }
  };

  const updateTime = () => {
    setCurrentTime(audio.currentTime);
  };

  const updateDuration = () => {
    setDuration(audio.duration);
  };

  if (!currentSong) {
    return null; // Don't display the player if no song is playing
  }

  return (
    <div className="music-player">
      <img src={currentSong.image} alt={currentSong.song} className="album-cover" />
      <div className="song-info">
        <p className="song-name">{currentSong.song}</p>
        <p className="artist">{currentSong.primary_artists}</p>
      </div>
      {/* Controls for toggle play/pause, previous, and next */}
      <div className='play-bar'>
      <div className="controls">
        <button onClick={handlePrevious} className="control-button">
          <i className="fa-solid fa-backward-step"></i>
        </button>
        <button onClick={handleTogglePlayPause} className="play-pause-button">
          {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
        </button>
        <button onClick={handleNext} className="control-button">
          <i className="fa-solid fa-forward-step"></i>
        </button>
      </div>
      {/* Seek bar */}
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={(e) => {
          setCurrentTime(e.target.value);
          audio.currentTime = e.target.value;
        }}
      />
      </div>
    </div>
  );
};

export default MusicPlayer;
