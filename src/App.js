import React, {useCallback, useState, useEffect, useContext} from 'react';
import './App.css';
import TopBar from './components/TopBar/TopBar';
import SearchResults from './components/SearchResults/SearchResults';
import SearchArea from './components/SearchArea/SearchArea'; 
import NominatedListModal from './components/NominatedListModal/NominatedListModal';

function App() {
  // searchResults, nominatedList and modal are all essential parts of the state
  // they have respective handlers when changes occur
  const [searchResults, setSearchResultsList] = React.useState([]);
  const [nominatedList, setNominatedList] = useLocalStorage('cache',[]);
  const [modal, setModal] = React.useState(false);

  const handleSearchResultsChange = useCallback((newSearchResults) => {setSearchResultsList(newSearchResults)}, [searchResults]);
  const handleNominatedListChange = useCallback((newNominatedList) => {setNominatedList(newNominatedList)}, [nominatedList]);
  const handleModalChange = useCallback(() => setModal(!modal), [modal]);

  const handleSearch = (results) => {
    for(let i = 0; i < results.length; i++) {
      let found = false;

      for(let j = 0; j < nominatedList.length; j++) {
        if(nominatedList[j].Title === results[i].Title) {
          found = true;          
          break;
        }
      }
      let newResults = results;
      newResults[i].nominated = found;
      setSearchResultsList(newResults);
    }
    //setSearchResultsList({...results, nominated: found});
  };

  // nominate  allows you to add to the nominate list when you have searched up the specific movie 
  const nominate = (movie) => {
    for(let i = 0; i < searchResults.length; i++) {
      if(searchResults[i] === movie) {
        let newResults = [...searchResults];
        newResults[i].nominated = true;
        handleSearchResultsChange(newResults);
      }
    }    
    handleNominatedListChange([...nominatedList, {Title: movie.Title, nominated: true, Year: movie.Year}]);
    if(nominatedList.length === 4) {
      alert('You have reached 5 nominations')
    }
  }

  // removeMovie from Nomination List
  const removeMovie = (movie) => {
    for(let i = 0; i < searchResults.length; i++) {
      if(searchResults[i].Title === movie.Title) {
        let newResults = [...searchResults];
        newResults[i].nominated = false;
        handleSearchResultsChange(newResults);
      }
    }
    handleNominatedListChange(nominatedList.filter(m => m.Title !== movie.Title))
  }

  return (
    <div className="App">
      <TopBar onClick={handleModalChange}/>
      <NominatedListModal show={modal} nominatedList={nominatedList} handleClose={handleModalChange} remove={removeMovie}/>
      <SearchArea onChange={handleSearch}/>
      <SearchResults searchResult={searchResults} nominate={nominate}/>
    </div>
  );
}

// Custom React Hook that allows the nomination list to be fetched from local memory, persists state through the use of localStorage
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
