import React, { Component } from 'react';
import './App.css';

import TicTacToe from "./views/tictactoe/TicTacToe";
import Connect4 from "./views/connect4/Connect4";
import Q20 from "./views/q20/Q20";
import Leaderboards from "./views/leaderboards/Leaderboards";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Arcade
        </header>
        <main>
          <h1>Interim Game Hub</h1>
          <div>
            <TicTacToe/>
            <Connect4/>
            <Q20/>
            <Leaderboards/>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
