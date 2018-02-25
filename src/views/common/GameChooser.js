import React from "react";
import {ALL_GAMES, ContClass} from "../../models/common/Games"
import {GameInfo} from "../../models/common/GameInfo"

export default class GameChooser extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
        };
    }

    handleClick(evt, gameControllerClass){
        evt.preventDefault();
        
        this.props.playerInfo.newGame(gameControllerClass);
        
        console.log("handled click")
    }

    componentWillUpdate(){
        if(this.props.playerInfo)
            this.props.playerInfo.addCallback(()=>{this.forceUpdate()});

    }

    render(){

        if(!this.props.playerInfo)
        {
            return (<div>Loading...</div>);
        }
        else if(this.props.playerInfo.isWaiting()){
            return (<div>Waiting for another player...</div>);
        }
        else if(this.props.playerInfo.isPlayingGame()){
            //this.props.playerInfo.getGame().getView()
            return (<div>{this.props.playerInfo.isCurrentPlayer()?"Your turn":"Their turn"}</div>);
        }
        
        return ( 
                <div>
                    {Object.values(ALL_GAMES).map((game)=><button key={game.gameTypeId} onClick={(evt)=>this.handleClick(evt, game[ContClass])}>{game.name}</button>)}
                </div>
                );
        
    }
}