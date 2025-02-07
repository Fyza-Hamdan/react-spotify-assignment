import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchbar/SearchBar.jsx';
import SearchResults from '../components/searchresults/SearchResults.jsx';
import Playlist from '../components/playlist/Playlist.jsx';
import { Spotify } from '../util/Spotify.js';

function App() {
  
  //State management (useState hooks)
  //Initialise a state hook to store our search term
  const [searchTerm, setSearchTerm] = useState("");

//Initializing a state hook to store our search result
const [searchResults, setSearchResults] = useState([]);

//Initialize a state hook to store our playlist
const [playListTracks, setPlayListTracks] = useState([]);

//Initialize a state hook to store our playlist name
const [playListName, setPlayListName] = useState("Enter PlayList Name");

//Function to update playListName
function updateName(name="") {
  setPlayListName(name);
}

  //Function to manage the searchTerm
  function search(term="") {
    setSearchTerm(term);
  }

  //Function to run the search
  function runSearch() {
    // prepare the results after procesing the search
//const filteredSearch = searchResults.filter((result) => String(result.name).toLowerCase().includes(searchTerm.toLowerCase()));

    //setSearchResults(filteredSearch);

    //Call Spotify search api to search for info, based on our searm term
    Spotify.search(searchTerm).then((response) => {
      console.log(response);
      setSearchResults(response);
    });
  }

//Function to save the Playlist
function savePlayList() {
  //extract the tracks' uri for saving
  const trackUri =playListTracks.map((track) => track.uri);
   Spotify.savePlayList(playListName, trackUri).then(() => {
    setPlayListName("Enter PlayList");
    setSearchResults([]);
    setPlayListTracks([]);
    setSearchTerm([""]);
    alert("Your playlist is save.")
    // 
   });
}
  
  //Function to add to playlist
  function addTrack(trackId) {
    //Use array.find() to find the track that match the parameter trackId
    const track = searchResults.find((result) => result.id === trackId);

    // Only add the track if the track does not exist in playListTracks, where findIndex return -1
    //Save the track to the playlist. Use the spread operator to unwrap the existing tracks and we add the selected track and store it as a new array in playListTracks
    const trackNotExists = playListTracks.findIndex((track) => track.id ===trackId);

    if(trackNotExists === -1)
    setPlayListTracks([...playListTracks, track]);
  }

  //Function to remove from the Playlist
  function removeTrack(trackId) {
    
    //Filter the tracks that we do not have from the trackId passed in. We have the filteterd track only
    const filteredTracks = playListTracks.filter((track) => track.id !== trackId);
    setPlayListTracks(filteredTracks);
  }

 
  //useEffect hook to prepare the page
  useEffect(() => {
    //Execution statements here
    //Invoke Sportify to render our results

    //Get a Spotify 1st at 1st page render
    Spotify.getAccessToken();

    //Mock the search result
    setSearchResults([
      {
        id: 1,
        name: "Track 1",
        album: "Track 1 Album",
        artist: "Track 1 Artist",
        uri: "Track 1 URI"
      },
      {
        id: 2,
        name: "Track 2",
        album: "Track 2 Album",
        artist: "Track 2 Artist",
        uri: "Track 2 URI"
      },
      {
        id: 3,
        name: "Track 3",
        album: "Track 3 Album",
        artist: "Track 3 Artist",
        uri: "Track 3 URI"
      }
    ]);
  }, [])
  
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        {/* Passing in 2 functions as properties into component: Searchbar */}
        <SearchBar 
        searchTerm={searchTerm}
        onSearch={search} 
        onRunSearch={runSearch} 
        />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          {/* Passing in a state claaed searchResults into component:SearchResults */}
          <SearchResults searchResults = {searchResults} onAddTrack={addTrack} />
          {/* <!-- Add a Playlist component --> */}
          {/* Passing in the state playListTracks into component */}
          <Playlist 
          playListName={playListName} 
          updateName={updateName}
          playListTracks = {playListTracks} 
          onRemoveTrack={removeTrack} 
          onSave={savePlayList}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
