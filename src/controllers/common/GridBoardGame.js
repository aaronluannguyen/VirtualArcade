//import PlayerToken from "../../models/common/Grid/PlayerToken";
import Grid from "../../models/common/Grid/Grid";
import GameInfo from "../../models/common/GameInfo/GameInfo";

export class GridBoardGame {
    
    constructor(gameInfo, boardSize, connectionsToWin)
    {
        this.controllerModelRef = {
            
            grid: new Grid(boardSize, connectionsToWin),
            
            //which game instance is being played by which player instance
            gameInfo: gameInfo,
        
        }

        //game info actually sends moves between users and firebase
        gameInfo.addCallback(handleOtherUserMove);

    }

    handleClick(x, y){

        //this move also needs to be sent to Firebase which will in turn be sent to the other player
        this.gameInfo.sendMove(x, y);

        if(this.controllerModelRef.grid.placeToken(x, y, this.gameInfo.playerId))
        {
            this.gameInfo.updateInfo({winnerPlayerId: this.gameInfo.playerId})
        }

    }

    handleOtherUserMove(data){

        if(this.controllerModelRef.grid.placeToken(x, y, data.playerId))
        {
            this.gameInfo.updateInfo({winnerPlayerId: data.playerId})
        }
        
    }

}