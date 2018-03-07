import React from "react";

export default class TicTacToe extends React.Component{
    render(){
        return (
            <div className="card" id="game-card">
                <div>
                    <img className="card-img-top" id="game-image" src={require(`${this.props.imgSrc}`)} />
                    <div className="card-body">
                        <h5>{this.props.gameName}</h5>
                        <p className="card-text">{this.props.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}