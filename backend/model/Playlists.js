import mongoose from "mongoose";
import { Song } from "./Songs.js";
import { Album } from "./album.js";

const playlistSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,},
  playlists: [
    {
      name: { type: String, required: true },
      songs: [{ type: Song }],
    },
  ],
  albums: [{ type: Album }],
  history :[{type:Song}]
});

export const playlistModel = mongoose.model('playlists', playlistSchema);
