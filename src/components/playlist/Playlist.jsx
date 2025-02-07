import React from 'react'
import './Playlist.css';
import Tracklist from '../tracklist/Tracklist.jsx'

function Playlist({playListName, updateName, playListTracks, onRemoveTrack, onSave}) {
function handlePlayListName(event) {
  updateName(event.target.value);
}

function handleFocus(event) {
  if (event.target.value === "Enter PlayList Name") {
    updateName("");
  }
}

function handleSave(event) {
  if(playListName === "" || playListName === "Enter PlayList Name") {
  alert("Cannot save. No playlist name.");
  return;
}
  onSave();
}

  return (
    <div className="Playlist">
      <input 
      value={playListName} 
      onChange={handlePlayListName}
      onFocus={handleFocus}
      placeholder="Enter PlayList Name"
      />
      {/* <!-- Add a TrackList component --> */}
      <Tracklist 
         searchResults={playListTracks}
         onAddTrack={false}
         onRemoveTrack={onRemoveTrack}
      />
      <button onClick={handleSave} className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  )
}

export default Playlist
