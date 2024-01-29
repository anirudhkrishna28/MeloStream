import mongoose from "mongoose"

export const Song = new mongoose.Schema({
  "id": { type: String, required: true },
  "320kbps": { type: String, required: true },
  "artistMap": { type: Object, required: true },
  "duration": { type: String, required: true },
  "image": { type: String, required: true },
  "primary_artists": { type: String, required: true },
  "year": { type: String, required: true },
  "media_url": { type: String, required: true },
  "singers": { type: String, required: true },
  "song": { type: String, required: true },
  "song_url": { type: String, required: true },
  "release_date": { type: Date, required: true },
  "language": { type: String, required: true },
  "album_url": { type: String, required: true },
});

// export const Song = mongoose.model('Song', songSchema);

// module.exports = Song;
