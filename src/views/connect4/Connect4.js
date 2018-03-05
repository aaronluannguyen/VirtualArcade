import React from "react";
import Row from "./Row"

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

    // componentWillReceiveProps(nextProps) {
    //     this.setState({grid: nextProps.grid});
    //     console.log(nextProps.grid);
    // }
    
    render(){
        let columns = [];
        if (this.state.grid) {
            console.log("GRID IS MOUNTED!");
            console.log(this.state.grid)
        } else {
            console.log("GRID IS NOT THERE!")
        }
        
        for (let i = 0; i < this.state.grid.length; i++) {
            columns.push(<Row col={this.state.grid[i]} gcontroller={this.state.gcontroller} index={i} pcontroller={this.state.pcontroller}/>)
        }

        return (
            <div className="container" id="grid" ref="wrap">
                <h1>Connect4 Placeholder View</h1>  
                <div className="container"> 
                    <div className="row justify-content-center">
                        {columns}
                    </div>
                </div>
            </div>
        );
    }

}