import React from "react";

export default class Tile extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        console.log("tile will mount");

    }

    render() {
        <div className=""> 
            <button className="btn-sm" />
        </div>
    }
}