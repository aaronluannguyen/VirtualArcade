import React from "react";
import GridBoardGame from "../../controllers/common/GridBoardGame"

export default class TicTacToe extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            pcontroller: this.props.pC,
            gcontroller: this.props.pC.getGame()
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