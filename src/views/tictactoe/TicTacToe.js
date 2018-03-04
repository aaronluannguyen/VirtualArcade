import React from "react";
import GridBoardGame from "../../controllers/common/GridBoardGame"

export default class TicTacToe extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            // board: new GridBoardGame(1, 3, 3)

        }
    }

    componentDidMount() {
        console.log("Tic Tac Toe Mounted");
    }

    render(){
        return (
            <div>
                <h1>TicTacToe Placeholder</h1>
            </div>
        );
    }
}