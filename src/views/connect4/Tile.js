import React from "react";

export default class Tile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            clicked: false,
            gcontroller: this.props.gcontroller
        }
    }

    componentWillMount(){
        console.log("tile will mount");

    }

    action() {
        this.setState({clicked: true});
        console.log("clicked " + this.props.xcoord + ", " + this.props.ycoord)
        this.state.gcontroller.gbg.handleClick(this.props.xcoord, this.props.ycoord)
    }

    render() {
        return (
            <div className="col"> 
                {
                    this.state.clicked === false ?
                    <button className="btn-sm" onClick={()=> this.action()}>
                        {this.props.tile}
                        Not Clicked!
                    </button> :
                    <button className="btn-sm" disabled>
                        Clicked!
                    </button>                  
                }
            </div>
        );
    }
}