import React from "react";

export default class TicTacToe extends React.Component{
    render(){
        return (
            <div id="player-card">
                <h3>Hello!</h3>
                <img id="player-picture" src={require(`./gamer.jpeg`)} alt="gamer profile picture"/>
                <h3>{this.props.player}</h3>
                <p>(Your New Cool Gamer Name)</p>
            </div>
        );
    }
}