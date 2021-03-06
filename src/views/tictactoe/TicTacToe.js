import React from "react";
import TicTacToeController from "../../controllers/tictactoe/TicTacToeController"
import GridBoardGame from "../../controllers/common/GridBoardGame"
import Tile from "./Tiles";
import "./TicTacToe.css";

export default class TicTacToe extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            pcontroller: this.props.pC,
            gcontroller: this.props.pC.getGame(),
            grid: this.props.grid,
            createdAt: Date.now(),
        }
    }

    componentWillUnmount(){
        this.state.pcontroller.unmount();
    }

    render(){
        let rows=[];

        for (let i =0; i < this.state.grid.length; i++) {
            for (let j = 0; j < this.state.grid.length; j++) {
                rows.push(<Tile key={`key_${this.state.createdAt}_${i}_${j}`} xCoordinate={j} yCoordinate={i} grid={this.state.grid} gcontroller={this.state.gcontroller} pcontroller={this.state.pcontroller}/>)
            }
        }

        return (
            <div>
                <h1>Tic Tac Toe!</h1>
                <div id="tttBoard" className="container">
                    {rows}
                </div>
            </div>
        );
    }
}