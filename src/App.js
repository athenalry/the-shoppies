import React, {useCallback, useState, useEffect, useContext} from 'react';
import './App.css';
import TopBar from './components/TopBar/TopBar';
import SearchResults from './components/SearchResults/SearchResults';
import SearchArea from './components/SearchArea/SearchArea'; 
import NominatedListModal from './components/NominatedListModal/NominatedListModal';

function App() {
  
  const [searchResults, setSearchResultsList] = React.useState({});
  const [nominatedList, setNominatedList] = useLocalStorage('cache',[]);
  const [modal, setModal] = React.useState(false);
  const handleSearchResultsChange = useCallback((newSearchResults) => {setSearchResultsList(newSearchResults)});
  const handleNominatedListChange = useCallback((newNominatedList) => {setNominatedList(newNominatedList)});
  const handleModalChange = useCallback(() => setModal(!modal), [modal]);

  const handleSearch = (results) => {
    let found = false;
    for(let i = 0; i < nominatedList.length; i++) {
      if(nominatedList[i] === results.Title) {found = true}
    }
    setSearchResultsList({...results, nominated: found});
  };

  const nominate = event => {
    handleSearchResultsChange({...searchResults, nominated: true});
    handleNominatedListChange([...nominatedList, {Title: searchResults.Title, nominated: true, Year: searchResults.Year}]);
    if(nominatedList.length === 4) {
      alert('You have reached 5 nominations')
    }
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
      <NominatedListModal show={modal} nominatedList={nominatedList} handleClose={handleModalChange} remove={removeMovie}/>
      <SearchArea onChange={handleSearch}/>
      <SearchResults searchResult={searchResults} nominate={nominate} removeNominate={removeNominate}/>
    </div>
  );
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export default App;
