import React, {useCallback} from 'react';
import {TextField, Select, Button} from '@shopify/polaris';
import axios from 'axios';
import './SearchArea.css'
function SearchArea (props) {
    // title, type, year users search for 
    const [title, setTitle] = React.useState("");
    const [type, setType] = React.useState("");
    const [year, setYear] = React.useState("");
    const changeTitle = useCallback((newTitle) => {setTitle(newTitle)}, [title]); 
    const changeType = useCallback((newType) => {setType(newType)}, [type]); 
    const changeYear = useCallback((newYear) => {setYear(newYear)}, [year]); 

    // updates the search results as the title/type/year changes
    const handleTitleChange = (newTitle) => {
      changeTitle(newTitle);
      getSearchResults(`https://www.omdbapi.com/?i=tt3896198&apikey=a6494952&s=${newTitle}&type=${type}&y=${year}`);
    };

    const handleTypeChange = (newType) => {
      changeType(newType);
      getSearchResults(`https://www.omdbapi.com/?i=tt3896198&apikey=a6494952&s=${title}&type=${newType}&y=${year}`);   
    };

    const handleYearChange = (newYear) => {
      changeYear(newYear);
      getSearchResults(`https://www.omdbapi.com/?i=tt3896198&apikey=a6494952&s=${title}&type=${type}&y=${newYear}`);   
    };

    const getSearchResults = url => {
      axios.get(url) 
        .then((response) => {
          let movies = response.data;
          if(movies.Search) {
            movies = movies.Search;
          }
          props.onChange(movies);
        })
        .catch((error) => {
          console.log('The following error has occurred');
          console.log(error);
        });
    };

    const options = [
      {label: '', value: ''},
      {label: 'Movie', value: 'movie'},
      {label: 'Series', value: 'series'},
      {label: 'Episode', value: 'episode'},
    ];
    
    return (
        <div className="search-area">
          <div className="query-box"> 
            <TextField label="Title" value={title} onChange={handleTitleChange} />
          </div>
          <div className="query-box">
            <TextField label="Year of Release" value={year} onChange={handleYearChange} />
          </div>
          <div className="query-box"> 
            <Select label="Type of Film" options={options} value={type} onChange={handleTypeChange} />
          </div>
          
        </div>
    );

    /*
    If you want to save API Calls, you can use this button instead, and get replace the handleXXXChange methods with changeXXX
    This way, an API request will only be sent when you click the button below
    <div className="search-button">
      <Button onClick={() => getSearchResults(`https://www.omdbapi.com/?i=tt3896198&apikey=a6494952&s=${title}&type=${type}&y=${year}`)}>Search</Button>
    </div>
    */
}

export default SearchArea;