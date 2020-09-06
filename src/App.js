import React, {useCallback, useState, useEffect, useContext} from 'react';
import './App.css';
import TopBar from './components/TopBar/TopBar';
import SearchResults from './components/SearchResults/SearchResults';
import SearchArea from './components/SearchArea/SearchArea';

function App() {
  const testObject = {
    Title: "Catching Fire",
    Year: "1989",
    nominated: false
  }
  let [searchResults, setSearchResultsList] = React.useState(testObject);
  let [nominatedList, setNominatedList] = React.useState([]);

  const handleSearchResultsChange = useCallback((newSearchResults) => {setSearchResultsList(newSearchResults)});
  const handleNominatedListChange = useCallback((newNominatedList) => {setNominatedList(newNominatedList)});

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
    handleNominatedListChange([...nominatedList, searchResults]);
    console.log(nominatedList.length);
    if(nominatedList.length === 4) {
      alert('You have reached 5 nominations')
    }
    console.log(searchResults)
  }

  const removeNominate = event => {
    handleSearchResultsChange({...searchResults, nominated: false});
    setNominatedList(nominatedList.filter(movie => movie !== searchResults))
  }

  return (
    <div className="App">
      <TopBar />
      <h1>{nominatedList.length}</h1>
      <SearchArea onChange={handleSearch}/>
      <SearchResults searchResult={searchResults} nominate={nominate} removeNominate={removeNominate}/>
    </div>
  );
}

export default App;