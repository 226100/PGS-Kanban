import React, { Component } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants'
import Card from './Card';
import './List.css';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.listName,
            newCardName: '',
            cards: props.cards,
        };
    }

    renderCards = () => {
        if (this.props.cards) {
            return this.state.cards.map((card) => <Card cardId={card.id} cardName={card.name} onDelete={this.deleteCard} />)
        }
    };

    onListNameChange = e => {
        this.setState({ name: e.target.value });
    };

    onCardNameChange = e => {
        this.setState({ newCardName: e.target.value });
    };

    addCard = () => {
        console.log(this.state.cards)
        axios.post(BASE_URL + '/card', { listId: this.props.listId, name: this.state.newCardName })
            .then((res) => {
                this.setState(prevState => {
                    return {
                        cards: [...prevState.cards, { listId: this.props.listId, name: this.state.newCardName }],
                        newCardName: ''
                    }
                })
            })
    }

    saveListName = () => {
        axios.put(BASE_URL + '/list',
            { name: this.state.name, boardId: this.props.boardId, listId: this.props.listId }
        ).then(() => {
            console.log("Successfully updated list!")
        }).catch((error) => {
            console.log(error);
        });
    };

    onDeleteList = () => {
        this.props.onDelete(this.props.listId)
    }

    deleteCard = (id) => {
        if (window.confirm('Are you sure?')) {
            axios.delete(`${BASE_URL}/card/${id}`)
                .then(() => {
                    this.setState(prevState => {
                        return { cards: prevState.cards.filter(x => x.id !== id) }
                    });
                })
                .catch(err => {
                    console.log(err)
                });
        }
    };

    render() {
        return (
            <div className="col-3">
                <div className="row">
                    <input value={this.state.name} onChange={this.onListNameChange}
                        className="form-control col-8" />
                    <button onClick={this.saveListName} className="btn btn-success col-2">Edit</button>
                    <button onClick={this.onDeleteList} className="btn btn-danger col-2 btn-block">X</button>
                </div>
                <div className="card card-block">
                    {this.renderCards()}
                </div>
                <div>
                    <input value={this.state.newCardName} onChange={this.onCardNameChange}
                        className="form-control col-12" placeholder="Add new card" />
                    <button className="btn btn-warning btn-sm" onClick={this.addCard}
                        disabled={!this.state.newCardName}>Add Card</button>
                </div>
            </div>
        )
    }
}