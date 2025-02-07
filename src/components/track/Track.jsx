import React from 'react'
import './Track.css';

function Track({track, onAddTrack, onRemoveTrack}) {


  function handleAddTrack(event){
    onAddTrack(track.id);
  }


  function handleRemoveTrack(event){
    onRemoveTrack(track.id);
  }

  // TODO: renderAction function (27)
  function renderAction(){
    
    if(!onAddTrack){
      return(
          <button className="Track-action" onClick={handleRemoveTrack}>
          -
        </button>
      );
    }
    
    if(!onRemoveTrack){
      return(
        <button className="Track-action" onClick={handleAddTrack}>
        +
        </button>
      );
    }
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>
          {/* <!-- track name will go here --> */}
          {track.name}
        </h3>
        <p>
          {/* <!-- track artist will go here--> */} {/* <!-- track album will go here --> */}
          {track.artist} | {track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  )
}

export default Track