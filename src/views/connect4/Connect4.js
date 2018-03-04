import React from "react";
import Row from "../../views/connect4/Row"

export default class Connect4 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            pcontroller: this.props.pC,
            gcontroller: this.props.pC.getGame(),
            grid: this.props.grid
        }
    }

    componentWillMount(){
        console.log("componentwillmount");

    }
    
    render(){
        let rows = [];
        if (this.state.grid) {
            console.log("GRID IS MOUNTED!");
            console.log(this.state.grid)
        } else {
            console.log("GRID IS NOT THERE!")
        }
        for (let i = 0; i < this.state.grid.length; i++) {
            rows.push(<Row row={this.state.grid[i]} gcontroller={this.state.gcontroller} row={i}/>)
        }

        return (
            <div className="container" id="grid" ref="wrap">
                <h1>Connect4 Placeholder View</h1>  
                <div className="container"> 
                    {rows}
                </div>
            </div>
        );
    }

}