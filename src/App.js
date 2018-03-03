import React, { Component } from 'react';
import './App.css';
import PlayerController from './controllers/common/PlayerController';
import GameChooser from './views/common/GameChooser'

import TicTacToe from "./views/tictactoe/TicTacToe";
import Connect4 from "./views/connect4/Connect4";
import Q20 from "./views/q20/Q20";
import Leaderboards from "./views/leaderboards/Leaderboards";

class App extends Component {
  constructor(props){
    super(props);
  
    this.state={
      playerController: undefined,
    }

  }

  componentDidMount() {
    
    let pC = new PlayerController([()=>{this.forceUpdate()}]);
    
    this.setState({playerController: pC});


  }

  componentWillUnmount() {

    if(this.state.playerController)
      this.state.playerController.unmount();
  
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
<<<<<<< HEAD
=======
          
>>>>>>> master
          <h1 className="App-title">{this.state.playerController ? <div>{this.state.playerController.getName() }</div> : <div>Not yet logged In</div>}</h1>
        </header>
        <main>
          <GameChooser playerInfo={this.state.playerController}/>
        </main>
      </div>
    );
  }
}

export default App;
