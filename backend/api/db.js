import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import { playlistModel } from "../model/Playlists.js"
import { UserModel } from "../model/Users.js"

const app = express()
app.use(express.json())
app.options('*', cors());
const router  = express.Router()

  
router.post("/playlists", async (req, res) => {
    try {
        console.log(req.body);
      const { userId } = req.body;

      const playlistDocuments = await playlistModel.findOne({ "userId": `${userId}` });
  
    //   const playlists = playlistDocuments.map((doc) => doc.playlists);
    //   res.send();
      console.log(playlistDocuments["playlists"]);
      res.send(playlistDocuments["playlists"]);
    } catch (err) {
      res.send({ "message": "Unable to find the data" });
    }
  });

  router.post("/albums", async (req, res) => {
    try {
      const { userId } = req.body;

 
      const playlistDocuments = await playlistModel.findOne({ "userId": `${userId}` });
  
    //   const playlists = playlistDocuments.map((doc) => doc.playlists);
  
      res.send(playlistDocuments["albums"]);
    } catch (err) {
      res.send({ "message": "Unable to find the data" });
    }
  });


  // router.post("/addSong",async(req,res)=>{
  //   try{

  //       const {userId,song,name} = req.body
  //       const playlist = await playlistModel.findOneAndUpdate(
  //           {
  //             userId,
  //             "playlists.name": name,
  //             "playlists.songs.id": { $ne: song.id },
  //           },
  //           {
  //             $push: {
  //               "playlists.$.songs": song,
  //             },
  //           },
  //           { new: true }
  //         );
        
  //         if (!playlist) {
  //           console.log("Playlist not found or song already exists in the playlist.");
  //           res.send({"message":"Playlist not found or song already exists in the playlist:"+name})
  //         } else {
  //           console.log("Song added to the playlist:", playlist);
  //           res.send({"message":"Song added to the playlist"+name})
  //         }
  //       } catch (error) {
  //         console.error("Error:", error.message);
  //       }


  // })
  router.post("/addSong", async (req, res) => {
    try {
      const { userId, song, name } = req.body;
  
      // Log incoming request data for debugging
      console.log("Received Request:");
      console.log("userId:", userId);
      console.log("song:", song);
      console.log("name:", name);
  
      const playlist = await playlistModel.findOne({ userId, "playlists.name": name });
  
      if (!playlist) {
        console.log("Playlist not found. Creating a new playlist.");
  
        // If the playlist doesn't exist, create a new one with the song
        await playlistModel.findOneAndUpdate(
          { userId },
          {
            $addToSet: {
              playlists: {
                name,
                songs: [song],
              },
            },
          },
          { upsert: true }
        );
  
        res.send({ message: "Song added to the new playlist: " + name });
      } else {
        // Check if the song already exists in the playlist
        const songExists = playlist.playlists.find((playlist) => playlist.name === name)?.songs.some((s) => s.id === song.id);
  
        if (songExists) {
          console.log("Song already exists in the playlist:", playlist);
          res.send({ message: "Song already exists in the playlist: " + name });
        } else {
          // If the song doesn't exist, add it to the playlist
          const updatedPlaylist = await playlistModel.findOneAndUpdate(
            { userId, "playlists.name": name },
            {
              $addToSet: {
                "playlists.$.songs": song,
              },
            },
            { new: true }
          );
  
          console.log("Song added to the playlist:", updatedPlaylist);
          res.send({ message: "Song added to the playlist: " + name });
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  
  

  router.post("/createPlaylist", async (req, res) => {
    try {
      const { userId, name,songs } = req.body;
      const p = await playlistModel.findOne({
        userId,
        "playlists.name": name,
      });
  
      if (p) {
        console.log("Playlist with the same name already exists.");
        res.send({ "message": "Playlist with the same name already exists." });
        return;
      }
  
      const newPlaylist = await playlistModel.findOneAndUpdate(

        { userId },
        {
          $push: {
            playlists: {
              name,
              songs: songs || [],
            },
          },
        },
        { new: true, upsert: true }
      );
  
      console.log("Playlist created:", newPlaylist);
      res.send({ "message": "Playlist created"});
    } catch (error) {
      console.error("Error:", error.message);
      res.send({ "message": "Internal Server Error" });
    }
  });
  router.delete("/deletePlaylist", async (req, res) => {
    try {
      const { userId, name } = req.body;
  
      const updatedUser = await playlistModel.updateOne(
        { userId },
        { $pull: { playlists: { name } } }
      );
  
      if (updatedUser.nModified === 0) {
        // If no playlist was modified, it means the playlist with the given name doesn't exist.
        res.send({ message: "Playlist not found" });
        return;
      }
  
      res.send({ message: "Playlist deleted" });
    } catch (error) {
      console.error("Error:", error.message);
      res.send({ message: "Internal Server Error" });
    }
  });



  router.post("/deleteSong", async (req, res) => {
    try {
      const { userId, song, name } = req.body;
      console.log(song.id);
      console.log(name);
  
      const playlist = await playlistModel.findOneAndUpdate(
        {
          userId,
          "playlists.name": name,
        },
        {
          $pull: {
            "playlists.$.songs": { id: song.id },
          },
        },
        { new: true }
      );
  
      if (!playlist) {
        console.log("Playlist not found or song not in the playlist.");
        res.status(404).send({ "message": "Playlist not found or song not in the playlist: " + name });
      } else {
        console.log("Song deleted from the playlist:", playlist);
        res.send({ "message": "Song deleted from the playlist: " + name });
      }
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send({ "error": "Internal Server Error" });
    }
  });

  router.post("/addAlbum",async(req,res)=>{

    try{
    const {userId,album} = req.body
    const albumdata = await playlistModel.findOneAndUpdate({
        userId,
        "albums.id":{$ne:album.id},

    },
    {
        $push: {
          "albums": album,
        },
      },
      { new: true })

      if (!albumdata) {
        console.log("album already found in user");
        res.send({"message":"cannot add ablum"})
      } else {
        console.log("album added to the user:", userId);
        res.send({"message":"album added to the user:"+userId})
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  })


  router.delete("/deleteAlbum",async(req,res)=>{

    try{
    const {userId,album} = req.body
    const albumdata = await playlistModel.findOneAndUpdate({
        userId,
        "albums.id":album.id,

    },
    {
        $pull: {
          "albums": {id:album.id},
        },
      },
      { new: true })

      if (!albumdata) {
        console.log("album not found  in the user.");
        res.send({"message":"cannot delete ablum or album not found"})
      } else {
        console.log("album deleted from the user:", userId);
        res.send({"message":"album deleted from the user:"+userId})
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  })

  router.post("/all", async (req, res) => {
    try {
      const { userId } = req.body;

 
      const playlistDocuments = await playlistModel.findOne({ "userId": `${userId}` });
  
    //   const playlists = playlistDocuments.map((doc) => doc.playlists);
  
      res.send(playlistDocuments);
    } catch (err) {
      res.send({ "message": "Unable to find the data" });
    }
  });


  router.post("/history",async(req,res)=>{
    try{
    const {userId} = req.body
    const historyData = await playlistModel.find({
        userId,
    },{history:1})

    if(!historyData){
        res.send({"message":"no history found"})
    }
    else{
        res.send(historyData)
    }
}    catch(error){
        res.send("error occured while fetching history")
    }

  })

  router.post("/addHistory",async(req,res)=>{
    try{
    const {userId,song} = req.body
    const history = await playlistModel.findOneAndUpdate(
        {
          userId,
          
          "history.id": { $ne: song.id },
        },
        {
          $push: {
            "history": song,
          },
        },
        { new: true }
      );
    
      if (!history) {
        console.log("song already exists in the history.");
        res.send({"message":"song already exists in the history:"})
      } else {
        console.log("Song added to the playlist:");
        res.send({"message":"Song added to the history"})
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  })

  router.post('/create', async (req, res) => {
    try {
      const { userId } = req.body;
      console.log(userId);
      const update = {
        $setOnInsert: {
          albums: [],
          history: [],
          playlists: [],
        },
      };
  
      const options = {
        upsert: true,
        new: true,
      };
  
      const user = await playlistModel.findOneAndUpdate({ userId }, update,options);
  
      console.log('User:', user);
  
      res.status(200).json({ message: 'User created/updated successfully', user });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
export {router as Data}




