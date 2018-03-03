import React from "react";

export default class Connect4 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            pcontroller: this.props.pC,
            gcontroller: this.props.pC.getGame(),
        }
    }

    componentWillMount(){
        console.log("componentwillmount");

    }
    
    render(){
        let rows = [];

        return (
            <div className="container" id="grid" ref="wrap">
                <h1>Connect4 Placeholder View</h1>  
            </div>
        );
    }

}