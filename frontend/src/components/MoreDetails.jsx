import React, { useState } from "react";

const MoreDetails = ({song}) => {

    const [isVisible,setIsVisible] = useState(false);

    const TogggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    return(
        <>
        <button onClick={TogggleVisibility} className="more-details-button"><i class="fa-solid fa-circle-info"></i></button>
        {isVisible &&
        <div className="sidebar">
          <h2>More Info</h2>
        <p><b>Singers  :</b>  {song.singers}</p>
            <p><b>Release Date :</b> {song.release_date}</p>
            <p><b>Language :</b> {song.language}</p>
            <p>
              <b>Album :</b> <a href={song.album_url}>View Album</a>
            </p>
            <p>
              Listen on <a href={song.song_url}>JioSaavn</a>
            </p>
        </div>
        }
        </>
    )

}
export default MoreDetails;