import React from "react";
import "./TicTacToe.css";

export default class Tile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            clicked: false,
        }
    }

    action() {
        this.setState({clicked: true});
        this.setState({clicker: this.props.gcontroller.getGameInfo().getCurrentPlayerId()});
        this.props.gcontroller.gbg.handleClick(this.props.xCoordinate, this.props.yCoordinate);
    }

    render() {
        return (
            <div id="tttTileContainer">
                {
                    this.state.clicked ?
                        <button id="tttTile" className="btn btn-primary" disabled>
                            CLICKED by {this.state.clicker}
                            x: {this.props.xCoordinate} y: {this.props.yCoordinate}
                        </button>
                        :
                        this.props.gcontroller.getGameInfo().getCurrentPlayerId() === this.props.pcontroller.data.playerId ?
                            <button id="tttTile" className="btn btn-primary" onClick={() => this.action()}>
                                x: {this.props.xCoordinate} y: {this.props.yCoordinate}
                            </button>
                            :
                            <button id="tttTile" className="btn btn-primary" disabled>
                                x: {this.props.xCoordinate} y: {this.props.yCoordinate}
                            </button>
                }
            </div>
        );
    }
}