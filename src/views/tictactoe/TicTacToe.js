import React from "react";
import TicTacToeController from "../../controllers/tictactoe/TicTacToeController"
import GridBoardGame from "../../controllers/common/GridBoardGame"
import Tile from "./Tiles";

export default class TicTacToe extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            pcontroller: this.props.pC,
            gcontroller: this.props.pC.getGame(),
            grid: this.props.grid
        }
    }

    componentDidMount() {
        console.log("Tic Tac Toe Mounted");
        if (this.state.grid) {
            console.log("GRID IS MOUNTED")
        }
    }

    render(){
        let rows=[];

        for (let i =0; i < this.state.grid.length; i++) {
            for (let j = 0; j < this.state.grid[i].length; j++) {
                rows.push(<Tile xCoordinate={j} yCoordinate={i}/>)
            }
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}