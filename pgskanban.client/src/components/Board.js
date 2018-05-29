import React from 'react';
import List from './List';
import axios from 'axios'
import './Board.css';
import { withRouter } from 'react-router-dom';
import { BASE_URL } from '../constants';

export class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            boardName: '',
            lists: [],
            boardId: 0,
            newListName: '',
            loaded: false,
            isEditing: false
        };
    }

    componentDidMount() {
        axios.get(`${BASE_URL}/board`).then((response) => {
            const board = response.data;
            this.setState({lists: board.lists, boardName: board.name, boardId: board.id, loaded: true})
        }).catch(() => {
            this.props.history.push('/new');
        });
    };

    deleteList = (id) => {
        if (window.confirm('Are you sure?')) {
            axios.delete(`${BASE_URL}/list/${id}`)
                .then(() => {
                    this.setState(prevState => {
                        return {lists: prevState.lists.filter(x => x.id !== id)}
                    });
                })
                .catch(err => {
                    console.log(err)
                });
        }
    };

    changeBoardName = () => {
        if (!this.state.isEditing) {
            this.setState({isEditing: true});
            return;
        }
        axios.put(`${BASE_URL}/board/${this.state.boardId}`, {name: this.state.boardName})
            .then(() => {
                this.setState({isEditing: false});
            })
            .catch(err => {
                this.setState({isEditing: false});
                console.log(err)
            });
    };

    addList = () => {
        axios.post(`${BASE_URL}/list`, {boardId: this.state.boardId, name: this.state.newListName})
            .then((response) => {
                this.setState(prevState => {
                    return {
                        lists: [...prevState.lists, response.data],
                        newListName: ''
                    }
                });
            })
            .catch(err => console.log(err));
    };

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    renderLists = () => {
        return (
            this.state.lists.map(
                (list) => <List key={list.id} onDelete={this.deleteList} listName={list.name} listId={list.id}
                                boardId={this.state.boardId} cards={list.cards ? list.cards : []}/>
            )
        )
    };

    render() {
        return (
            this.state.loaded &&
            <div>
                <div>
                    <div className="row p-3">
                        <div className="col-6 offset-2">
                            <input readOnly={!this.state.isEditing} className="form-control" name="boardName"
                                   value={this.state.boardName}
                                   onChange={this.onChange}/>
                        </div>
                        <div className="col-2">
                            <button disabled={!this.state.boardName} onClick={this.changeBoardName}
                                    className="btn btn-success btn-block">
                                {this.state.isEditing ? 'Save!' : 'Edit board name'}
                            </button>
                        </div>
                    </div>
                    <button onClick={this.addList} disabled={!this.state.newListName} className="btn btn-info">
                        Add new list
                    </button>
                    <input name="newListName" onChange={this.onChange} value={this.state.newListName} type="text"
                           className="listName__input"/>
                </div>
                <div className="container-fluid">
                    <div className="row flex-row flex-nowrap">
                        {this.renderLists()}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Board);
