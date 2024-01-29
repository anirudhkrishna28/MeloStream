import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Song from "./song";
import SongAlbum from "./SongAlbum";
import NavBar from "./NavBar";
import Bars from "./Bars";


const Albums = () => {
  const location = useLocation();
  const album = location.state;
  console.log(album);

  const inp = { "albumUrl": album["perma_url"] };

  const [albumlist, setAlbumlist] = useState({});
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch("/api/album-songs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inp),
        });
        //   console.log(response1);
        const data1 = await response1.json();
        console.log(data1);

        setAlbumlist(data1);
        setLoading(false); // Set loading to false once data is fetched
        console.log("songs", albumlist["songs"]);
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  const renderLoader = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30vh',
      }}
    >

      <Bars />
    </div>

  );

  return (
    <>
    <NavBar />
      <div className="album-list">
        {/* <div></div> */}
        {loading ? (
          renderLoader()
        ) : !albumlist ? (
          <p>No data available</p>
        ) : (
          <div className="album-margin">
          <SongAlbum songs={albumlist.songs} />
          </div>
        )}
      </div>
    </>
  );
};

export default Albums;