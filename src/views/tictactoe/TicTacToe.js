import React from "react";
import GridBoardGame from "../../controllers/common/GridBoardGame"

export default class TicTacToe extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        console.log("Tic Tac Toe Mounted");
    }

    render(){
        return (
            <h1>TicTacToe Placeholder</h1>

        );
    }
}