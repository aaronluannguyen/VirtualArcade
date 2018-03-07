import React, { Component } from 'react';
import './App.css';
import PlayerController from './controllers/common/PlayerController';
import GameChooser from './views/common/GameChooser'
import PlayerCard from "./views/common/PlayerCard";

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
    
    //let pC = ;
    
    this.setState({playerController: new PlayerController([()=>{this.forceUpdate()}])});


  }

  componentWillUnmount() {

    if(this.state.playerController)
      this.state.playerController.unmount();
  
  }

  render() {
    
    console.log("username", this.state.playerController ? this.state.playerController.getName() : "player not init'd");

    return (
      <div className="App">
        <div className="jumbotron">
          <div id="title-background">
              <h1>The Virtual Arcade</h1>
          </div>
        </div>
        <div>
          {
              this.state.playerController ?
                  <PlayerCard player={this.state.playerController.getName()}/>
                  :
                  <PlayerCard player="Not Logged In Yet"/>
          }
        </div>
        <div><h4 className="mt-3">{this.state.playerController && this.state.playerController.wonLastGame()? "You won the last game!":"Good game! Keep trying!"}</h4></div>
        <main>
          <GameChooser playerInfo={this.state.playerController}/>
        </main>
      </div>
    );
  }
}

export default App;
