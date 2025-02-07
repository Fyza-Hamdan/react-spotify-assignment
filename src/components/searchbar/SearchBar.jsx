import React from 'react'
import "./SearchBar.css"

function SearchBar({searchTerm, onSearch, onRunSearch}) {

  //Function handleSearchChange() passes the value to props
  function handleSearchChange(event) {
    onSearch(event.target.value);
  }

  function handleSearchClick(event) {
    onRunSearch();
  }

  return (
    <div className="SearchBar">
      <input value={searchTerm} onChange={handleSearchChange}placeholder="Enter A Song, Album, or Artist" />
      <button onClick={handleSearchClick} className="SearchButton">SEARCH
     </button>
    </div>
  )
}

export default SearchBar