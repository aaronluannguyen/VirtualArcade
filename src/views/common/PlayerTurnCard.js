import React from "react";

export default class TicTacToe extends React.Component{
    render(){
        return (
            <div>
                {
                    this.props.currentPlayer === this.props.me ?
                        <div id="both-player-cards" className="row container">
                            <div id="player-turn-card" className="card text-white bg-success mb-3 col-5">
                                <div className="card-header">{this.props.me}</div>
                                <div className="card-body">
                                    <h5 className="card-title">Your Turn!</h5>
                                </div>
                            </div>
                            <div id="player-turn-card" className="card text-white bg-danger mb-3 col-5">
                                <div className="card-header">{this.props.opponent} (Opponent)</div>
                                <div className="card-body">
                                    <h5 className="card-title">Not their turn.</h5>
                                </div>
                            </div>
                        </div>
                        :
                        <div id="both-player-cards" className="row container">
                            <div id="player-turn-card" className="card text-white bg-danger mb-3 col-5">
                                <div className="card-header">{this.props.me}</div>
                                <div className="card-body">
                                    <h5 className="card-title">Not your turn.</h5>
                                </div>
                            </div>
                            <div id="player-turn-card" className="card text-white bg-success mb-3 col-5">
                                <div className="card-header">{this.props.opponent} (Opponent)</div>
                                <div className="card-body">
                                    <h5 className="card-title">Their Turn!</h5>
                                </div>
                            </div>
                        </div>
                }
            </div>
        );
    }
}