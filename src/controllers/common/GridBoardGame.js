//import PlayerToken from "../../models/common/Grid/PlayerToken";
import Grid, { TIE_CONDITION } from "../../models/common/Grid/Grid";
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

        console.log("gridboardgame gameInfo", gameInfo)
        //game info actually sends moves between users and firebase
        gameInfo.addDataCallback((data)=>this.handleOtherUserMove(data));

    }

    _handleGameLogic(x, y, playerId){
        
        let winner = false;

        if((winner = this.controllerModelRef.grid.placeToken(x, y, playerId)) != false) 
        {
            console.log("winner or tie");

            if(winner != TIE_CONDITION){
                winner = playerId;
                console.log("winner", winner);
            }
            else {
                console.log("tie", winner);
            }

            this.controllerModelRef.gameInfo.updateInfo({winnerPlayerId: winner})
        }

    }

    handleClick(x, y){

        //this move also needs to be sent to Firebase which will in turn be sent to the other player
 
        let playerId = this.controllerModelRef.pcontroller.getPlayerId();

        console.log("outgoing move");

        this.controllerModelRef.gameInfo.updateInfo({
            actions:{
                move:{
                    playerId: playerId,
                    selection:{
                        x: x,
                        y: y,
                    }
                }
            }
        });

        this._handleGameLogic(x,y, playerId);
       
    }

    handleOtherUserMove(data){

        console.log("incoming move");

        console.log("handleusermove", data);

        if(!data || !data.actions){
            console.error("no actions to perform");
            this.controllerModelRef.pcontroller.handleUIUpdate();
            return;
        }

        this._handleGameLogic(data.actions.move.selection.x, data.actions.move.selection.y, data.actions.move.playerId);
        
        //ui updates are already always triggered by the firebase callback handler, but they occur before this callback (so data is not yet updated)
        this.controllerModelRef.pcontroller.handleUIUpdate();
    }

    

}