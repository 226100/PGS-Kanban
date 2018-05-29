import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export class NewBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            boardName: '',
        }
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    addNewBoard = () => {
        axios.post('http://localhost:56265/api/board', {name : this.state.boardName}).then(() => {
            this.props.history.push('/');
        });
    };

    render() {
        return (
            <div className="p-3">
                <h1>Add new board</h1>
                <div className="row">
                    <div className="col-6 offset-2">
                        <input name="boardName" onChange={this.onChange} value={this.state.boardName} className="form-control"/>
                    </div>
                    <div className="col-2">
                        <button onClick={this.addNewBoard} disabled={!this.state.boardName} className="btn btn-success">Add Board</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(NewBoard)