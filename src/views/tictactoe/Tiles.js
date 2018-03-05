import React from "react";
import "./TicTacToe.css";

export default class Tile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            x: this.props.xCoordinate,
            y: this.props.yCoordinate
        }
    }

    action() {
        this.setState({clicker: this.props.gcontroller.getGameInfo().getCurrentPlayerId()});
        this.props.gcontroller.gbg.handleClick(this.state.y, this.state.x);
        this.props.pcontroller.handleUIUpdate();
    }

    render() {
        return (
            <div id="tttTileContainer">
                {
                    this.props.grid[this.state.x][this.state.y] !== null ?
                        <button id="tttTile" className="btn btn-primary" disabled>
                            CLICKED by {this.state.clicker}
                            x: {this.state.x} y: {this.state.y}
                        </button>
                        :
                        this.props.gcontroller.getGameInfo().getCurrentPlayerId() === this.props.pcontroller.data.playerId ?
                            <button id="tttTile" className="btn btn-primary" onClick={() => this.action()}>
                                x: {this.state.x} y: {this.state.y}
                            </button>
                            :
                            <button id="tttTile" className="btn btn-primary" disabled>
                                x: {this.state.x} y: {this.state.y}
                            </button>
                }
            </div>
        );
    }
}