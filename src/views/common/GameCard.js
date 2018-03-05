import React from "react";

export default class TicTacToe extends React.Component{
    render(){
        return (
            <div className="card">
                <img className="card-img-top" src={require(`./tictactoe.png`)} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.gameName}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
            </div>
        );
    }
}