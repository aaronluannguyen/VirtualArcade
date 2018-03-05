import React from "react";

let baseStyles = {
    color: "#0000ff"
};

let otherStyles = {
    color: "ffff00"
};

let emptyStyles = {
    color: "#fff"
};

export default class Tile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            clicked: false,
            gcontroller: this.props.gcontroller,
            currentplayerId: this.props.pcontroller.getPlayerId()
        }

        // if (this.props.tile) {
        //     this.setState({tileId: this.props.tile.getplayerId()})
        //     console.log(this.state.tileId)
        // }

        
    }

    componentWillMount(){
        console.log("tile will mount");

    }

    action() {
        this.setState({clicked: true});
        console.log("clicked " + this.props.xcoord + ", " + this.props.ycoord);
        this.state.gcontroller.gbg.handleClick(this.props.xcoord, this.props.ycoord);
        this.state.gcontroller.handleUIUpdate();
    }

    render() {
        let styles = emptyStyles;
        if (this.props.tile) {
            // this.setState({tileId: this.props.tile.getplayerId()})
            console.log(this.props.tile.getplayerId());
            styles = this.props.tile.getplayerId() === this.state.currentplayerId ? baseStyles : otherStyles;
        }
        
        return (
            <div className="col"> 
                {
                    !this.props.tile ?
                    <button style={styles} className="btn-sm" onClick={this.state.gcontroller.getGameInfo().getCurrentPlayerId() == this.state.gcontroller.getPlayerId() ? () => this.action() : () => {}}>
                        {this.props.tile}
                        No
                    </button> :
                    <button style={styles} className="btn-sm" disabled>
                        Yes
                    </button>                  
                }
            </div>
        );
    }
}