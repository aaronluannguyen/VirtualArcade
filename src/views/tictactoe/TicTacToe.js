import React from "react";
import TicTacToeController from "../../controllers/tictactoe/TicTacToeController"
import GridBoardGame from "../../controllers/common/GridBoardGame"

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
        return (
            <div>
                TTT Placeholder
            </div>
        );
    }
}