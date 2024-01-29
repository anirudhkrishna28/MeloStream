import mongoose from "mongoose"

export const Album = new mongoose.Schema({
  "id": { type: String, required: true },
  "title": { type: String, required: true },
  "image": { type: String, required: true },
  "perma_url": { type: String, required: true },
  "more_info": {
    "music": { type: String, required: true },
    "ctr": { type: Number, required: true },
   " year": { type: String, required: true },
    "is_movie": { type: String, required: true },
    "language": { type: String, required: true },
    "song_pids": { type: String, required: true },
  },
  "description": { type: String, required: true },
});

//  export const AlbumSchema = mongoose.model('Album', albumSchema);

// module.exports = Album;
