//import PlayerToken from "../../models/common/Grid/PlayerToken";
import Grid from "../../models/common/Grid/Grid";
import GameInfo, { TIE_CONDITION } from "../../models/common/GameInfo";

export class GridBoardGame {
    
    constructor(playerController, gameInfo, boardSize, connectionsToWin)
    {
        this.controllerModelRef = {
            
            grid: new Grid(boardSize, connectionsToWin),
            pcontroller: playerController,
            
            //which game instance is being played by which player instance
            gameInfo: gameInfo,
        
        }   

        //game info actually sends moves between users and firebase
        gameInfo.addDataCallback((data)=>this.handleOtherUserMove(data));

    }

    _handleGameLogic(x, y, playerId){
        
        let winner = false;

        if((winner = this.controllerModelRef.grid.placeToken(x, y, playerId)) != false) 
        {
            if(winner != TIE_CONDITION){
                winner = playerId;
            }

            this.controllerModelRef.gameInfo.updateInfo({winnerPlayerId: winner})
        }

    }

    handleClick(x, y){

        //this move also needs to be sent to Firebase which will in turn be sent to the other player 
        let playerId = this.controllerModelRef.pcontroller.getPlayerId();

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

        if(!data || !data.actions){
            console.error("no actions to perform");
            this.controllerModelRef.pcontroller.handleUIUpdate();
            return;
        }

        Object.keys(data.actions).forEach(moveKey => {
            let move = data.actions[moveKey];

            this._handleGameLogic(move.selection.x, move.selection.y, move.playerId);
        
        });
        
        //ui updates are already always triggered by the firebase callback handler, but they occur before this callback (so data is not yet updated)
        this.controllerModelRef.pcontroller.handleUIUpdate();
    }

    

}