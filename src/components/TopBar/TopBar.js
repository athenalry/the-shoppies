import React from 'react';
import './TopBar.css';
import logo from '../../assets/logo.svg';
import {Button} from '@shopify/polaris';

function TopBar (props) {
    const viewNominations = event => {
        props.onClick();
    }

    return (
        <div className="top-bar">
            <img src={logo} alt="No Image Found"/>
            <div className="nominated-button">
                <Button onClick={viewNominations}>View Nominated</Button>
            </div>
        </div>
    );
}

export default TopBar;