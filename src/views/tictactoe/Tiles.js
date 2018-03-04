import React from "react";
import "./TicTacToe.css";

export default class Tile extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <button id="tttTile" className="btn btn-primary">
               x: {this.props.xCoordinate} y: {this.props.yCoordinate}
            </button>
        );
    }
}