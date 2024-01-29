
import React from 'react';

const SongCard = ({ song }) => {
  return (
    <div className="song-card">
      <img src={song.image} alt={song.title} />
      <h3>{song.title}</h3>
      <p>{song.primary_artists}</p>

      <audio controls>
        <source src={song.media_url} type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SongCard;