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
    }

    render(){
        let rows=[];

        for (let i =0; i < 9; i++) {
            rows.push(<Tile>button</Tile>)
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}