import React from 'react';
import {Card, Button, Modal} from '@shopify/polaris';
import './NominatedListModal.css';

function NominatedListModal (props) {
    return(
        <div className="nominated-list">
          <Modal open={props.show} onClose={props.handleClose}>
          <h1 className="modal-title">Your Nominations</h1>
          {props.nominatedList.map((movie) => {
            return(
              <Card title={movie.Title} sectioned>
                <div className="card-body">
                <p>{`Year: ${movie.Year}`}</p>
                <Button>Remove</Button>
                </div>
              </Card>
            )
          })}
          </Modal>
        </div>
    )
}
export default NominatedListModal;
