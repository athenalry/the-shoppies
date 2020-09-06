import React from 'react';
import './TopBar.css';
import logo from '../../assets/logo.svg';
import {Button} from '@shopify/polaris';

function TopBar () {
    return (
        <div className="top-bar">
            <img src={logo} alt="No Image Found"/>
            <div className="nominated-button">
                <Button>View Nominated</Button>
            </div>
        </div>
    );
}

export default TopBar;