import React, { Component } from 'react';
import Board from './components/Board';
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import NewBoard from './components/NewBoard';

class App extends Component {
  render() {
    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Board} />
                    <Route path="/new" component={NewBoard} />
                </div>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;
