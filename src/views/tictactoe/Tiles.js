import React from "react";
import "./TicTacToe.css";

export default class Tile extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="tttTile">
                <button className="btn btn-primary">
                    {this.props.xCoordinate} {this.props.yCoordinate}
                </button>
            </div>
        );
    }
}