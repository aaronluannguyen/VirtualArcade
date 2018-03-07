import React from "react";
import Connect4 from "../../views/connect4/Connect4";
import Tile from "../../views/connect4/Tile"

export default class Row extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gcontroller: this.props.gcontroller,
            ycoord: this.props.index,
            pcontroller: this.props.pcontroller
        }
    }

    componentWillMount(){
        console.log("Row will mount");

    }

    render() {
        let rows = []
        let lastY = 7;
        for (let i = 0; i < 8; i++) {
            if(this.props.col[i]){
                lastY--;
            }
        }
        // console.log("checking col props", this.props.col)
        for (let i = 0; i < 8; i++) {
            rows.push(<Tile tile={this.props.col[i]} ycoord={lastY} xcoord={this.state.ycoord} gcontroller={this.state.gcontroller} pcontroller={this.state.pcontroller}/>)
        }
        return (        
            <div className="mx-3"> 
                {rows}
            </div>
        );
    }
}