import React from 'react';
import {Card, Button} from '@shopify/polaris';
import './SearchResults.css';
function SearchResults (props) {
    const onClickNominate = event => {
        props.nominate(event);
    }

    if(!props.searchResult.Title) {
        return(
            <div className="search-results">
                <p>No Results To Display</p>
            </div>
        )
    } else if(props.searchResult.nominated === false) {
        return (
            <div className="search-results">
                <Card title={props.searchResult.Title} sectioned>
                    <div className="card-body">
                        <p>{`Year: ${props.searchResult.Year}`}</p>
                        <Button onClick={onClickNominate}>Nominate</Button>
                    </div>
                </Card>
            </div>
        );
    } else {
        return (
            <div className="search-results">
                <Card title={props.searchResult.Title} sectioned>
                    <div className="card-body">
                        <p>{`Year: ${props.searchResult.Year}`}</p>
                        <Button disabled={true}>Nominate</Button>
                    </div>
                </Card>
            </div>
        );
    }
    
}

export default SearchResults;