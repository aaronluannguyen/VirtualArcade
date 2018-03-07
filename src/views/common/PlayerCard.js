import React from "react";

export default class TicTacToe extends React.Component{
    render(){
        return (
            <div id="player-card" className="card text-white bg-dark mb-3">
                <div class="card-header">
                    <h1>Welcome!</h1>
                </div>
                <div class="card-body">
                    <img id="player-picture" src={require(`./gamer.jpeg`)} alt="gamer profile picture"/>
                    <h3>{this.props.player}</h3>
                </div>
            </div>
        );
    }
}