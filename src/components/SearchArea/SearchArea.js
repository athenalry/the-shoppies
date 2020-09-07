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
    // if the title's empty, be sure to make the search result an empty object 
    const handleTitleChange = (newTitle) => {
      changeTitle(newTitle);
      if(newTitle !== '') {
        getSearchResults(`https://www.omdbapi.com/?i=tt3896198&apikey=a6494952&s=${newTitle}&type=${type}&y=${year}`);
      } else {
        props.onChange({});
      }
    };

    const handleTypeChange = (newType) => {
      changeType(newType);
      if(title === '') {
        props.onChange({});
      } else {
        getSearchResults(`https://www.omdbapi.com/?i=tt3896198&apikey=a6494952&s=${title}&type=${newType}&y=${year}`);   
      }
    };

    const handleYearChange = (newYear) => {
      changeYear(newYear);
      if(title === '') {
        props.onChange({});
      } else {
        getSearchResults(`https://www.omdbapi.com/?i=tt3896198&apikey=a6494952&s=${title}&type=${type}&y=${newYear}`);   
      }
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
          <div className="search-button">
            <Button onClick={getSearchResults}>Search</Button>
          </div>
        </div>
    );
}

export default SearchArea;