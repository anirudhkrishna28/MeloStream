
import express from 'express'
import axios from 'axios'
import cors from 'cors'
import mongoose from 'mongoose'
import { MusicRouter } from './api/music.js'
import { Data } from './api/db.js'
import { userRouter } from './api/users.js'

// // function sortAlbumsByLanguage(data, language) {
// //   // if (!data || !data.albums || !data.albums.data) {
// //   //   console.error("Invalid data format");
// //   //   return [];
// //   // }

// //   // const albums = data.albums.data;

// //   const filteredAlbums = data.filter(album => album.more_info.language === language);


// //   return filteredAlbums;
// // }

// // async function getSongFromAlbumsDummy(albumName, songName) {
// //   const dataurl = `https://jio-saavan-green.vercel.app/result/?query=${albumName}`;

// //   try {
// //     const response = await fetch(dataurl);

// //     if (response.ok) {
// //       const songdata = await response.json();
// //       // console.log(songdata);
// //       const smalldata = {};
// //       const l = songName.split(" ");

// //       for (const s of l) {
// //         for (let i in songdata["songs"]) {
// //           if (songdata["songs"][i]["song"].toLowerCase().includes(s.toLowerCase())) {
// //             // console.log(songdata);
// //             smalldata["320kbps"] = songdata["songs"][i]["320kbps"];
// //             smalldata["artistMap"] = songdata["songs"][i]["artistMap"];
// //             smalldata["duration"] = songdata["songs"][i]["duration"];
// //             smalldata["image"] = songdata["songs"][i]["image"];
// //             smalldata["primary_artists"] = songdata["songs"][i]["primary_artists"];
// //             smalldata["year"] = songdata["songs"][i]["year"];
// //             smalldata["media_url"] = songdata["songs"][i]["media_url"];
// //             smalldata["singers"] = songdata["songs"][i]["singers"];
// //             smalldata["song"] = songdata["songs"][i]["song"];
// //             smalldata["song_url"] = songdata["songs"][i]["perma_url"];
// //             smalldata["release_date"] = songdata["songs"][i]["release_date"];
// //             return smalldata;
// //           }
// //         }
// //       }
// //     } else {
// //       return { "message": "Unable to locate the song with the specified URL" };
// //     }
// //   } catch (error) {
// //     console.error("Error fetching data:", error);
// //   }
// // }

// async function getsongsFromAlbum(albumurl){

//   const dataurl = `https://jio-saavan-green.vercel.app/result/?query=${albumurl}`;
  
//   try {
//       let response = await fetch(dataurl)
//       let songdata = await response.json()
//       let album = {}
//       album["albumid"] = songdata["albumid"]
//       album["image"] = songdata["image"]
//       album["name"] = songdata["name"]

//       for (const s of l) {
//         for (let i in songdata["songs"]) {
//           if (songdata["songs"][i]["song"].toLowerCase().includes(s.toLowerCase())) {
//             // console.log(songdata);
//             smalldata["320kbps"] = songdata["songs"][i]["320kbps"];
//             smalldata["artistMap"] = songdata["songs"][i]["artistMap"];
//             smalldata["duration"] = songdata["songs"][i]["duration"];
//             smalldata["image"] = songdata["songs"][i]["image"];
//             smalldata["primary_artists"] = songdata["songs"][i]["primary_artists"];
//             smalldata["year"] = songdata["songs"][i]["year"];
//             smalldata["media_url"] = songdata["songs"][i]["media_url"];
//             smalldata["singers"] = songdata["songs"][i]["singers"];
//             smalldata["song"] = songdata["songs"][i]["song"];
//             smalldata["song_url"] = songdata["songs"][i]["perma_url"];
//             smalldata["release_date"] = songdata["songs"][i]["release_date"];
//             return smalldata;
//           }
//         }
      
//     }
//     }
//   catch (error) {
//     console.error("Error fetching data:", error);
//   }

// }

// // async function getAlbumurlLang(song, language) {
// //   const url =
// //     "https://www.jiosaavn.com/api.php?app_version=5.18.3&api_version=4&readable_version=5.18.3&v=79&_format=json&query=" +
// //     song +
// //     "&__call=autocomplete.get";
// //   try {

// //     let song_pids = "";
// //     let song_pid = "";

// //     const response = await fetch(url);

// //     if (!response) {
// //       console.log("unable to fetch the albumurl");
// //     }

// //     else {
// //       const data = await response.json();
// //       first_album = sortAlbumsByLanguage(data["albums"]["data"], language)[0]
// //       // console.log(first_album);

// //       if (first_album) {
// //         song_pids = first_album["more_info"]["song_pids"] || {};
// //         song_pid = song_pids.split(",")[0];
// //       }

// //       let playlist_url = "";
// //       let playlistapi =
// //         "https://www.jiosaavn.com/api.php?app_version=5.18.3&api_version=4&readable_version=5.18.3&v=79&_format=json&__call=song.getDetails&pids=" +
// //         song_pid;

// //       try {
// //         const presponse = await fetch(playlistapi);
// //         const songdata = await presponse.json();
// //         let s = songdata[song_pid] || {};
// //         if (s) {
// //           playlist_url = s["more_info"]["album_url"];
// //           return playlist_url;
// //         }
// //       }
// //       catch (err) { }

// //     }

// //   } catch (err) {
// //     console.log("error occured");
// //   }
// // }



// async function getAlbums(song) {
//   const url =
//     "https://www.jiosaavn.com/api.php?app_version=5.18.3&api_version=4&readable_version=5.18.3&v=79&_format=json&query=" +
//     song +
//     "&__call=autocomplete.get";
//   try {

//     let song_pids = "";
//     let song_pid = "";
//     let albumSongs = []
//     const response = await fetch(url,{
//         method: "POST", 
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });

//     if (!response) {
//       console.log("unable to fetch the albumurl");
//     }

//     else {
//       const data = await response.json();
//       const albums = data["albums"]["data"]
//       for (const album of albums) {
//         if (album) {
//           const songsInAlbum = await getAlbumSongs(album["perma_url"])
//           albumSongs.push(songsInAlbum)  
//         }
//       }
//     }
//     return albumSongs;
//   }
//   catch (err) { }
// }

// async function getAlbumSongs(playlistUrl) {
//   const dataurl = "https://jio-saavan-green.vercel.app/result/?query=" + playlistUrl
//   try {
//     let response = await fetch(dataurl)
//     let songdata = await response.json()
//     // console.log(songdata["songs"]);
//     let album = {}
//     album["albumid"] = songdata["albumid"]
//     album["image"] = songdata["image"]
//     album["name"] = songdata["name"]
//     // console.log(album);
//     let songs = []
//     for (let i in songdata["songs"]) {
//         // console.log("skkskvbfv");
//       // let smalldata = {}
//       // // smalldata["320kbps"] = songdata["songs"][i]["320kbps"]
//       // // smalldata["artistMap"] = songdata["songs"][i]["artistMap"]
//       // // smalldata["duration"] = songdata["songs"][i]["duration"]
//       // // smalldata["image"] = songdata["songs"][i]["image"]
//       // // smalldata["primary_artists"] = songdata["songs"][i]["primary_artists"]
//       // // smalldata["year"] = songdata["songs"][i]["year"]
//       // // smalldata["media_url"] = songdata["songs"][i]["media_url"]
//       // // smalldata["singers"] = songdata["songs"][i]["singers"]
//       // // smalldata["song"] = songdata["songs"][i]["song"]
//       // // smalldata["song_url"] = songdata["songs"][i]["perma_url"]
//       // // smalldata["release_date"] = songdata["songs"][i]["release_date"]
//       // // smalldata["language"] = songdata["songs"][i]["language"]
//     //   console.log(songdata["songs"][i]);
//       const x = await getSongInfo(songdata["songs"][i])
//     //   console.log("s=",x);
//       songs.push(x)
//     }
//     album["songs"] = songs

//     return album

//   }
//   catch (err) {
//     return { "meaasage": "unable to find the album" }
//   }

// }

// async function getSongInfo(data) {

//   let songurl = data["perma_url"]
//   const url = `https://jio-saavan-green.vercel.app/song/?query=${songurl}`

//   try {
//     let smalldata = {}

//     const response = await fetch(url)
//     // console.log();
//     const songdata = await response.json()
//     // console.log("songdata in getinfosong:",songdata);

//     smalldata["320kbps"] = songdata["320kbps"]
//     smalldata["artistMap"] = songdata["artistMap"]
//     smalldata["duration"] = songdata["duration"]
//     smalldata["image"] = songdata["image"]
//     smalldata["primary_artists"] = songdata["primary_artists"]
//     smalldata["year"] = songdata["year"]
//     smalldata["media_url"] = songdata["media_url"]
//     smalldata["singers"] = songdata["singers"]
//     smalldata["song"] = songdata["song"]
//     smalldata["song_url"] = songdata["perma_url"]
//     smalldata["release_date"] = songdata["release_date"]
//     smalldata["language"] = songdata["language"]
//     smalldata["album_url"] = songdata["album_url"]
//     // console.log(smalldata);
//     return smalldata

//   }
//   catch (err) {
//     return { "meassage": "unable to fetch song data" }
//   }

// }

// async function getSongs(songName) {
//   const url =
//     "https://www.jiosaavn.com/api.php?app_version=5.18.3&api_version=4&readable_version=5.18.3&v=79&_format=json&query=" +
//     songName +
//     "&__call=autocomplete.get";
//   try {

//     let songsdata = []
//     const response = await fetch(url,{
//         method: "POST", 
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });

//     if (!response) {
//       console.log("unable to fetch the albumurl");
//     }

//     else {
//       const data = await response.json();
      
//       let songs = data["songs"]["data"]
//     //   console.log(songs);
//       for (const song of songs) {
//         // console.log(song);

//         const x = await getSongInfo(song)
//         // console.log(x);
//         songsdata.push(x)
//       }
//     //   console.log(songsdata);
//       return songsdata
//     }
//   }
//   catch (err) { }
// }

// async function getTopQuery(songName) {
//   const url =
//     "https://www.jiosaavn.com/api.php?app_version=5.18.3&api_version=4&readable_version=5.18.3&v=79&_format=json&query=" +
//     songName +
//     "&__call=autocomplete.get";
//   try {

//     let songsdata = []
//     const response = await fetch(url,{
//         method: "POST", 
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });

//     if (!response) {
//       console.log("unable to fetch the albumurl");
//     }

//     else {
//       const data = await response.json();
//       let songs = data["topquery"]["data"]
//     //   console.log(songs);
//       for (const song of songs) {
//         // console.log(song);
//         if(song["type"] == "album"){
//             console.log(song["perma_url"]);
//             const x = await getAlbumSongs(song["perma_url"])
//             songsdata.push(x)
//         }
//         else{
//         const x = await getSongInfo(song)
//         songsdata.push(x)
//         }
//         // console.log(x);
        
//       }
//       return songsdata
//     }
//   }
//   catch (err) { }
// }




// async function topSongs() {
//   const topSongsUrl =
//     "https://www.jiosaavn.com/api.php?__call=webapi.get&token=8MT-LQlP35c_&type=playlist&p=1&n=20&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0";

//   try {
//     const response = await axios.get(topSongsUrl, { headers: { "Accept": "application/json" } });
//     const songsList = response.data.list;

//     for (let i = 0; i < songsList.length; i++) {
//       songsList[i].title = songsList[i].title
//         .toString()
//         .replace(/&amp;/g, "&")
//         .replace(/&#039;/g, "'")
//         .replace(/&quot;/g, "\"");

//       songsList[i].more_info.artistMap.primary_artists[0].name =
//         songsList[i].more_info.artistMap.primary_artists[0].name
//           .toString()
//           .replace(/&amp;/g, "&")
//           .replace(/&#039;/g, "'")
//           .replace(/&quot;/g, "\"");

//       songsList[i].image = songsList[i].image.toString().replace("150x150", "500x500");
//     }

//     return songsList;
//   } catch (error) {
//     console.error("Error fetching top songs:", error);
//     return [];
//   }
// }


// async function fetchData() {
//   try {
//     let songname = "leo";
//     let language = "tamil"
//     // var songname = document.getElementById("searchInput").value;
//     console.log(songname);
//     // let albumUrl = await getAlbumurl(songname, language);

//     // console.log("Album URL:", albumUrl);

//     // let albumSongs = await getAlbumSongs(albumUrl);
//     // console.log("Album Songs Data:", albumSongs);

//     const albums = await getAlbums(songname)
//     console.log("albums",albums);

//     let songs = await getTopQuery(songname)
//     // // let songs = await Promise.all(songsPromises);
//     console.log("TopQuery",songs);
//     let songsdata = await getSongs(songname)
//     console.log("songs",songsdata);

//   } catch (err) {
//     console.log("Unable to get data:", err);
//   }


// }

// // fetchData()

// async function getAlbumNames(song){
//     const url =
//     "https://www.jiosaavn.com/api.php?app_version=5.18.3&api_version=4&readable_version=5.18.3&v=79&_format=json&query=" +
//     song +
//     "&__call=autocomplete.get";
//   try {

//     let song_pids = "";
//     let song_pid = "";
//     let albuminfo = []
//     const response = await fetch(url,{
//         method: "POST", 
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });

    

//     if (!response) {
//       console.log("unable to fetch the albumurl");
//     }

//     else {
//       const data = await response.json();
//     //   console.log(data["albums"]["data"])
//       const  albums = data["albums"]["data"]
//     //   console.log("albums",albums);
//       for (const album of albums) {
//         // console.log("hsbdksdb cs");
//         let addalbum = {}
//         if (album) {
//             // console.log(album);
//             addalbum["title"] = album["title"]
//             addalbum["image"] = album["image"]
//             addalbum["perma_url"] = album["perma_url"]
//             addalbum["more_info"] = album["more_info"]
//             addalbum["description"] = album["description"]
//             albuminfo.push(addalbum)
//         }
//       }
//     }
//     // console.log("albuminfo",albuminfo);
//     return albuminfo;
//   }
//   catch (err) { }
// }

// const port = 3000

const app = express()
const port = 3000

app.use(express.json())

app.options('*', cors());

app.use("/api",MusicRouter)
app.use("/data",Data)
app.use("/user",userRouter)


// app.get("/all",async (req,res)=>{
//     let returndata = {}
//     const {songname} = req.body
//     let songs = await getSongs(songname)
//     // let topSongs = await topSongs(songname)
//     let albums  = await getAlbums(songname)
//     let TopQuery = await getTopQuery(songname)
//     returndata["topQuery"] = TopQuery
//     returndata["songs"] = songs
//     returndata["albums"] = albums
//     res.send(returndata)

// })

// app.get("/top",async(req,res)=>{
//     const {songname} = req.body
//     let topsongs = await topSongs(songname)
//     res.send(topsongs)
// })

// app.get("/songs",async(req,res)=>{
//     const {songname} = req.body
//     let songs = await getSongs(songname)
//     res.send(songs)
// })

// app.get("/albums-songs",async(req,res)=>{
//     const {songname} = req.body
//     let albums = await getAlbums(songname)
//     res.send(albums)
// })

// app.get("/result",async(req,res)=>{
//     const {songname} = req.body
//     let result = await getTopQuery(songname)
//     res.send(result)
// })

// app.get("/albums",async(req,res)=>{
//     const {songname} = req.body
//     console.log(songname);
//     let result = await getAlbumNames(songname)
//     // console.log(result);
//     res.send(result)
// })

// app.get("/album-songs",async(req,res)=>{
//     const {albumUrl} = req.body
//     let result = await getAlbumSongs(albumUrl)
//     res.send(result)
// })




// app.get("/playlists",async(req,res)=>{
//     const {userId} = req.body;
//     // const playlists = await 

// })

const url = 'mongodb+srv://anikrish2804:anirudh2804@recipes.lrn1itb.mongodb.net/music';
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected successfully to the database');
        app.listen(port, () => {
            console.log('Server is running on port ' + port);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
    });



// app.listen(port, () => console.log(`Example app listening on port ${port}!`))