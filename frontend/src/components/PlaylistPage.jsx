import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetUserID } from "./GetUserId";
import Search from './Search';
import NavBar from "./NavBar";

export const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([])
  const [albums, setAlbums] = useState([]);
//   const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const requestData = {"userId":GetUserID()}
      console.log(requestData);
      try {
        // Example data to be sent to the server
        // const requestData = {
        //   userId: "65a7dfd4452bc2aa8a8cc263",
        // };

        const songData = {
            songname:"leo",
        }

        // const response1 = await fetch("/api/songs", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(songData),
        //   });
        //   const data1 = await response1.json();
        //   setSongs(data1)
        //   console.log(data1);
        


        const response = await fetch("/data/playlists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        // console.log(response);

        const data = await response.json();
        setPlaylists(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }

      const response1 = await fetch("/data/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data1 = await response1.json();
      // setSongs(data1)
      console.log("album data",data1);
      setAlbums(data1);

    };

    

    
    fetchData();
  }, []);

   const navigate = useNavigate();


   const handlePlaylistClick = (data) => {
     // Navigate to the individual playlist (you can replace '/song' with your desired path)
     navigate(`/songs`,{state:data});
   };

   const handleAlbumClick = (perma_url) => {
    navigate('/albums', { state: { perma_url: perma_url } });
  };
  const handleSearchClick = () =>{
    navigate('/search')
  }
 
   return (
    <>
    
    <NavBar />
    <div className="playlist-album">
     <div className="play-list">
       {playlists.map((playlist) => (
         <div key={playlist._id} onClick={() => handlePlaylistClick({"songs":playlist.songs,"name":playlist.name})} className="playlist-item">
         {playlist.songs.length > 0 && (
           <img src={playlist.songs[0].image} alt={playlist.name}></img>
         )}
         <p>{playlist.name}</p>
       </div>
       
       ))}
     </div>
     <h1>Albums</h1>
     <div className="album-list">
       {albums.map((album) => (
         <div key={album.id} onClick={() => handleAlbumClick(album.perma_url)} className="album-item">
          <img src={album.image} alt={album.title}></img>
          <p>{album.title}</p>
         </div>
       ))}
     </div>
     </div>
     </>
   );


  
};