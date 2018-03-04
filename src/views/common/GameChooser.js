import React from "react";
import {ALL_GAMES, ContClass} from "../../models/common/Games"
import {GameInfo} from "../../models/common/GameInfo"

export default class GameChooser extends React.Component{

    /**
     * Provides UI (View) for user to select game they wish to play, informs them when they are waiting for a match and will provide
     * the specific game view when a match is found
     * @class GameChooser
     * @extends React.Component
     * @param props React Properties
     */
    constructor(props){
        super(props);
        
        this.state={
        };
    }

    /**
     * handle click event from UI, creates a new game (MVC) controller
     * @function GameChooser.handleClick
     * @param {*} evt 
     * @param {GameController} gameControllerClass 
     */
    handleClick(evt, gameControllerClass){
        evt.preventDefault();
        
        this.props.playerInfo.newGame(gameControllerClass);
        
        //this.props.playerInfo.addUICallback(()=>{this.forceUpdate()});
    }



    componentWillUpdate(){
    //    if(this.props.playerInfo)
            

    }

    render(){

        if(!this.props.playerInfo)
        {
            return (<div>Loading...</div>);

        } else if(this.props.playerInfo.isWaitingForMatch()){
            
            return (<div>Waiting for another player...</div>);
        
        } else if(this.props.playerInfo.isPlayingGame()){
            
            return (<div>
                        <div>{this.props.playerInfo.isCurrentPlayer()?"Your turn":"Their turn"}</div>
                        <div>{this.props.playerInfo.getGame().getView()}</div>
                    </div>
                );
        }
        
        return ( 
                <div>
                    {Object.values(ALL_GAMES).map((game)=><button key={game.gameTypeId} onClick={(evt)=>this.handleClick(evt, game[ContClass])}>{game.name}</button>)}
                </div>
                );
        
    }
}