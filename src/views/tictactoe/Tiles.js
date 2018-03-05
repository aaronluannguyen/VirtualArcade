import React from "react";
import "./TicTacToe.css";

export default class Tile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            clicked: false,
            gcontroller: this.props.gcontroller
        }
    }

    action() {
        this.setState({clicked: true});
        //this.state.gcontroller.gbg.handleClick(this.props.xCoordinate, this.props.yCoordinate);
    }

    render() {
        return (
            <div id="tttTileContainer">
                {
                    this.state.clicked ?
                        <button id="tttTile" className="btn btn-primary" onClick={() => this.action()}>
                            CLICKED
                            x: {this.props.xCoordinate} y: {this.props.yCoordinate}
                        </button>
                        :
                        <button id="tttTile" className="btn btn-primary" onClick={() => this.action()}>
                            x: {this.props.xCoordinate} y: {this.props.yCoordinate}
                        </button>
                }
            </div>
        );
    }
}