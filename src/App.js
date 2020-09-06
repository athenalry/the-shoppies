import React, {useCallback, useState, useEffect, useContext} from 'react';
import './App.css';
import TopBar from './components/TopBar/TopBar';
import SearchResults from './components/SearchResults/SearchResults';
import SearchArea from './components/SearchArea/SearchArea'; 
import NominatedListModal from './components/NominatedListModal/NominatedListModal';

function App() {
  const testObject = {
    Title: "Catching Fire",
    Year: "1989",
    nominated: false
  }
  let [searchResults, setSearchResultsList] = React.useState(testObject);
  let [nominatedList, setNominatedList] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const handleSearchResultsChange = useCallback((newSearchResults) => {setSearchResultsList(newSearchResults)});
  const handleNominatedListChange = useCallback((newNominatedList) => {setNominatedList(newNominatedList)});
  const handleModalChange = useCallback(() => setModal(!modal), [modal]);

  const handleSearch = (results) => {
    // probably bad too
    let found = false;
    for(let i = 0; i < nominatedList.length; i++) {
      if(nominatedList[i] === results.Title) {found = true}
    }
    setSearchResultsList({...results, nominated: found});
  };

  const nominate = event => {
    handleSearchResultsChange({...searchResults, nominated: true});
    handleNominatedListChange([...nominatedList, {Title: searchResults.Title, nominated: true, Year: searchResults.Year}]);
    console.log(nominatedList.length);
    if(nominatedList.length === 4) {
      alert('You have reached 5 nominations')
    }
    console.log(searchResults)
  }

  const removeNominate = event => {
    handleSearchResultsChange({...searchResults, nominated: false});
    setNominatedList(nominatedList.filter(movie => movie.Title !== searchResults.Title))
  }

  const removeMovie = (removeMovie) => {
    setNominatedList(nominatedList.filter(movie => movie.Title !== removeMovie.Title))
  }

  return (
    <div className="App">
      <TopBar onClick={handleModalChange}/>
      <h1>{nominatedList.length}</h1>
      <NominatedListModal show={modal} nominatedList={nominatedList} handleClose={handleModalChange} remove={removeMovie}/>
      <SearchArea onChange={handleSearch}/>
      <SearchResults searchResult={searchResults} nominate={nominate} removeNominate={removeNominate}/>
    </div>
  );
}

export default App;
