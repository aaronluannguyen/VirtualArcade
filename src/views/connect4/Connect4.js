import React from "react";
import Row from "./Row"

export default class Connect4 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            pcontroller: this.props.pC,
            gcontroller: this.props.pC.getGame(),
            grid: this.props.grid,
            createdAt: Date.now(),
        }
    }

    componentWillMount(){
        console.log("componentwillmount");

    }
    componentWillUnmount(){
        
        console.log("connect4 view component will unmount", this.state.createdAt, this.state.pcontroller);
        this.state.pcontroller.unmount();
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({grid: nextProps.grid});
    //     console.log(nextProps.grid);
    // }
    
    render(){
        let rows = [];
        if (this.state.grid) {
            console.log("GRID IS MOUNTED! in C4 createdAt: ", this.state.createdAt);
            console.log(this.props.grid)
        } else {
            console.log("GRID IS NOT THERE!", this.state.createdAt)
        }
        
        for (let i = 0; i < this.state.grid.length; i++) {
            rows.push(<Row key={this.state.createdAt+"_row_"+i} grid={this.state.grid} row={this.state.grid[i]} gcontroller={this.state.gcontroller} index={i} pcontroller={this.state.pcontroller}/>)
        }

        return (
            <div className="container-fluid p-3 bg-warning" id="grid" ref="wrap">
                <div className="container bg-dark" id="c4headerContainer">
                    <h4 className="" id="c4header">CONNECT FOUR</h4>  
                </div>
                <div className="container-fluid"> 
                    <div className="row justify-content-center">
                        {rows}
                    </div>
                </div>
            </div>
        );
    }

}