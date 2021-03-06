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
    
    let pC = new PlayerController([()=>{this.forceUpdate()}]);
    
    this.setState({playerController: pC});

    //this cleans up the lobby at the very least if the user refreshed the page while waiting for another player
    window.addEventListener("beforeunload", ()=>pC.unmount());

  }

  componentWillUnmount() {

    if(this.state.playerController)
      this.state.playerController.unmount();
  
  }


  render() {
    
    //show game win/loss results and motivational messages as part of this top level view, this is a less obtrusive
    //result status message for mobile devices than a modal, and MVP solution for lower priority feature

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
        <div><h4>{this.state.playerController && this.state.playerController.gameResult()}</h4></div>
        <main>
          <GameChooser playerInfo={this.state.playerController}/>
        </main>
      </div>
    );
  }
}

export default App;
