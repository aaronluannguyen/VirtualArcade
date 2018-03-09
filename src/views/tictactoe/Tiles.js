import React from "react";
import "./TicTacToe.css";

export default class Tile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            x: this.props.xCoordinate,
            y: this.props.yCoordinate,
            marker: true
        }
    }

    action() {
        this.setState({marker: !this.state.marker});
        this.props.gcontroller.gbg.handleClick(this.state.x, this.state.y);
        this.props.pcontroller.handleUIUpdate();
    }

    render() {

        let tileToken = this.props.grid[this.state.y][this.state.x] ? this.props.grid[this.state.y][this.state.x].getPlayerId(): undefined;
        
        let x_or_o = this.props.gcontroller.getGameInfo().getPlayerNumber(tileToken) == 0;
         
        let alt_text = x_or_o ? "X": "O";

        return (
            <div id="tttTileContainer">
                {
                    this.props.grid[this.state.y][this.state.x] !== null ?
                            <button id="tttTile" className="btn btn-primary" disabled>
                                <img id="marker" src={x_or_o ? require(`./x.png`) : require(`./o.png`)} alt={alt_text}/>
                            </button>
                        :
                        this.props.gcontroller.getGameInfo().getCurrentPlayerId() === this.props.pcontroller.data.playerId ?
                            <button id="tttTile" className="btn btn-primary" onClick={() => this.action()}>

                            </button>
                            :
                            <button id="tttTile" className="btn btn-primary" disabled>

                            </button>
                }
            </div>
        );
    }
}