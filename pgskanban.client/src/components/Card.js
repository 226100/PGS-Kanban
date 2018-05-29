import React, { Component } from 'react';
import Modal from 'react-modal';
import './Card.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px'
    }
};

export default class Card extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    onDelete = () => {
        this.props.onDelete(this.props.cardId)
    }

    render() {
        return (
            <div className="card__container">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                <h2>{this.props.cardName}</h2>
                <div className="form-group">
                    <label for="description">Description:</label>
                    <textarea className="form-control" rows="5" id="description"></textarea>
                    <button onClick={this.closeModal} className="btn btn-danger col-2">X</button>
                    <button className="btn btn-info">Save</button>
                </div>
                </Modal>
                <div className="row">
                    <div onClick={this.openModal} className="col-10">{this.props.cardName}</div>
                    <button onClick={this.onDelete} className="btn btn-danger col-2">X</button>
                </div>
            </div>
        )
    }
}