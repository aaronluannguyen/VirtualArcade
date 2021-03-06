import React from "react";

let baseStyles = {
    backgroundColor: "#0000ff"
};

let otherStyles = {
    backgroundColor: "ffff00"
};

let emptyStyles = {
    backgroundColor: "#fff"
};

export default class Tile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            gcontroller: this.props.gcontroller,
            currentplayerId: this.props.pcontroller.getPlayerId()
        }

    }

    action() {
        
        let lastRow = 7;
        for (let i = 7; i >= 0; i--) {
        
            if (!this.props.grid[this.props.col][i]) {
                lastRow = i;
                break;
            }
        
        }
        
        this.state.gcontroller.gbg.handleClick(lastRow, this.props.col);
        this.state.gcontroller.handleUIUpdate();
    }

    render() {
        
        let id = null;

        if (this.props.tile) {
            id = this.props.tile.getPlayerId();


        }
        
        let primary_or_other = this.props.gcontroller.getGameInfo().getPlayerNumber(id) == 0;


        return (
            <div className="col p-1"> 
                {
                    !this.props.tile ?
                    <button className="btn-sm btn-empty" id="button" onClick={this.state.gcontroller.getGameInfo().getCurrentPlayerId() == this.state.gcontroller.getPlayerId() ? () => this.action() : () => {}}>
                        {this.props.tile}
                        
                    </button> : 
                    <div>
                        {
                            <button className={"btn-sm " + (primary_or_other ? " btn-primary " : " btn-other ")} id="button" disabled={id !== this.state.currentplayerId}/>   
                        }
                    </div>
                }   
            </div>
        );
    }
}