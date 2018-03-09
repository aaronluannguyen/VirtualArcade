import React from "react";
import "./TicTacToe.css";

export default class Tile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            x: this.props.xCoordinate,
            y: this.props.yCoordinate,
            createdAt: Date.now(),
        }
    }

    action() {
        
        this.props.gcontroller.gbg.handleClick(this.state.x, this.state.y);
    
    }

    render() {

        let tileToken = this.props.grid[this.state.y][this.state.x] !==null ? this.props.grid[this.state.y][this.state.x].getPlayerId(): undefined;
        
        let x_or_o = this.props.gcontroller.getGameInfo().getPlayerNumber(tileToken) === 0;
         
        let alt_text = x_or_o ? "X": "O";

        let key = this.state.createdAt+"_tile_x"+this.state.x+"_y"+this.state.y;

        let myTurn = this.props.gcontroller.getGameInfo().getCurrentPlayerId() !== this.props.pcontroller.data.playerId;

        return (
            <div id="tttTileContainer">
                {
                    <button key={key} id="tttTile" className="btn btn-primary" onClick={() => this.action()} disabled={tileToken ? true : myTurn ? true : false }>
                        { tileToken ? <img key={key+x_or_o?"x":"o"} id="marker" src={x_or_o ? require(`./x.png`) : require(`./o.png`)} alt={alt_text}/> : undefined }
                    </button>   
                }
            </div>
        );
    }
}