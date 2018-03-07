import React from "react";
//import PlayerToken from "../../models/common/Grid/PlayerToken";
import Grid from "../../models/common/Grid/Grid";
import GameInfo from "../../models/common/GameInfo";

export class GridBoardGame {
    
    constructor(playerController, gameInfo, boardSize, connectionsToWin)
    {
        this.controllerModelRef = {
            
            grid: new Grid(boardSize, connectionsToWin),
            pcontroller: playerController,
            
            //which game instance is being played by which player instance
            gameInfo: gameInfo,
        
        }   

        console.log("gridboardgame gameInfo", gameInfo);
        //game info actually sends moves between users and firebase
        gameInfo.addDataCallback((data)=>this.handleOtherUserMove(data));

    }

    handleClick(x, y){

        //this move also needs to be sent to Firebase which will in turn be sent to the other player
 
        this.controllerModelRef.gameInfo.updateInfo({
            actions:{
                move:{
                    playerId: this.controllerModelRef.pcontroller.getPlayerId(),
                    selection:{
                        x: x,
                        y: y,
                    }
                }
            }
        });

        if(this.controllerModelRef.grid.placeToken(x, y, this.controllerModelRef.pcontroller.getPlayerId()))
        {
            this.controllerModelRef.gameInfo.updateInfo({winnerPlayerId: this.controllerModelRef.pcontroller.getPlayerId()})
       
        }

    }

    handleOtherUserMove(data){

        console.log("handleusermove", data);

        if(!data.actions){
            console.error("no actions to perform");
            return;
        }

        if(this.controllerModelRef.grid.placeToken(data.actions.move.selection.x, data.actions.move.selection.y, data.actions.move.playerId))
        {
            this.controllerModelRef.gameInfo.updateInfo({winnerPlayerId: data.actions.move.playerId})
        }
        
        this.controllerModelRef.pcontroller.handleUIUpdate();
    }

    

}