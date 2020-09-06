import React, {useCallback, useState} from 'react';
import {TextField, Select, Button} from '@shopify/polaris';
import axios from 'axios';
import './SearchArea.css'
function SearchArea (props) {
    const [title, setTitle] = React.useState("");
    const [type, setType] = React.useState("");
    const [year, setYear] = React.useState("");

    const handleTitleChange = (newTitle) => {
      setTitle(newTitle); 
      if(newTitle !== '') {
        getSearchResults(`http://www.omdbapi.com/?i=tt3896198&apikey=a6494952&t=${newTitle}&type=${type}&y=${year}`);
      } else {
        props.onChange({});
      }
    };

    const handleTypeChange = (newType) => {
      setType(newType);
      if(title === '') {
        props.onChange({});
      } else {
        getSearchResults(`http://www.omdbapi.com/?i=tt3896198&apikey=a6494952&t=${title}&type=${newType}&y=${year}`);   
      }
    };

    const handleYearChange = (newYear) => {
      setYear(newYear);
      if(title === '') {
        props.onChange({});
      } else {
        getSearchResults(`http://www.omdbapi.com/?i=tt3896198&apikey=a6494952&t=${title}&type=${type}&y=${newYear}`);   
      }
    };

    const options = [
      {label: '', value: ''},
      {label: 'Movie', value: 'movie'},
      {label: 'Series', value: 'series'},
      {label: 'Episode', value: 'episode'},
    ];
    
    const getSearchResults = url => {
      axios.get(url) 
        .then((response) => {
          const movie = response.data;
          props.onChange(movie);
        })
        .catch((error) => {
          console.log('The following error has occurred');
          console.log(error);
        });
    };
        
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