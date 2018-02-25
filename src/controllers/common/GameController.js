import GameMatcher from "../common/GameMatcher";
import GameInfo from "../../models/common/GameInfo";

export default class GameController{
    constructor(gameTypeId, playerController, gameInProgress=undefined){
        
        this._data = {
            playerController: playerController,
            gameMatcher: gameInProgress ? undefined : new GameMatcher(gameTypeId, playerController.getPlayerId(), (data)=>this.startGame(data)),
            gameInfo: gameInProgress,
        }
    }

    startGame(data){
        this._data.gameInfo = new GameInfo(data);
        this._data.gameInfo.addCallback(()=>this._data.playerController.handleUpdate());
    }

    getGameInfo(){
        return this._data.gameInfo;
    }

};