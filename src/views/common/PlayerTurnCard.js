import React from "react";

export default class TicTacToe extends React.Component{
    render(){
        return (
            <div>
                {
                    this.props.currentPlayer === this.props.me ?
                        <div id="both-player-cards" className="row container">
                            <div id="player-turn-card" className="card text-white bg-success mb-3 col-5">
                                <div id="player-name" className="card-body">You</div>
                            </div>
                            <div id="player-turn-card" className="card text-white bg-danger mb-3 col-5">
                                <div id="player-name" className="card-body">{this.props.opponent}</div>
                            </div>
                        </div>
                        :
                        <div id="both-player-cards" className="row container">
                            <div id="player-turn-card" className="card text-white bg-danger mb-3 col-5">
                                <div id="player-name" className="card-body">You</div>
                            </div>
                            <div id="player-turn-card" className="card text-white bg-success mb-3 col-5">
                                <div id="player-name"className="card-body">{this.props.opponent}</div>
                            </div>
                        </div>
                }
            </div>
        );
    }
}