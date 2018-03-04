import React from "react";
import Connect4 from "../../views/connect4/Connect4";
import Tile from "../../views/connect4/Tile"

export default class Row extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gcontroller: this.props.gcontroller,
            ycoord: this.props.row
        }
    }

    componentWillMount(){
        console.log("Row will mount");

    }

    render() {
        let columns = []
        for (let i = 0; i < 8; i++) {
            columns.push(<Tile tile={this.props.row[i]} ycoord={this.state.ycoord} xcoord={i} gcontroller={this.state.gcontroller}/>)
        }

        return (        
            <div className="row mx-3"> 
                {columns}
            </div>
        );
    }
}