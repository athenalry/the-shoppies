import React from 'react';
import {Card, Button} from '@shopify/polaris';
import './SearchResults.css';
function SearchResults (props) {
    // for each search result, you can add and remove it from your nomination list directly on the Card
    // if the movie has been nominated the nominate button will change to "Remove Nomination"
    // an alternative way would be to show two buttons one for add, one for remove and pass in the nominated state to determine which button should be disabled 
    // like so: <Button disabled={true/false}>

    const onClickNominate = event => {
        props.nominate(event);
    }

    const onClickRemoveNominate = event => {
        props.removeNominate(event);
    }

    if(props.searchResult.length === 0) {
        return(
            <div className="search-results">
                <p>{props.searchResult.Error || "No results found"}</p>
            </div>
        )
    } else {
        return (
            <div className="search-results">
                {
                    props.searchResult.map((result, index) => {
                        return(
                            <Card title={result.Title} sectioned>
                                <div className="card-body">
                                    <p>{`Year: ${result.Year}`}</p>
                                    <div className="button-collection">
                                        <Button onClick={() => onClickNominate(result)} disabled={result.nominated}>Nominate</Button>
                                    </div>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
        );
    } 
}

export default SearchResults;