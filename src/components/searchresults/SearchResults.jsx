import React from 'react'
import './SearchResults.css'
import Tracklist from '../tracklist/Tracklist'

function SearchResults({searchResults, onAddTrack}) {

  console.log(searchResults[0]);

  return (
    <div className='SearchResults'>
      <h2>Search Results</h2>
      {/* Import tracklist here */}
      <Tracklist 
        searchResults={searchResults}
        onAddTrack={onAddTrack}
        onRemoveTrack={false}
      />
      </div>
  )
}

export default SearchResults