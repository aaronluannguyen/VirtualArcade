import GameMatcher from "../common/GameMatcher";
import GameInfo from "../../models/common/GameInfo";

export default class GameController{
    /**
     * Should be derived from by any specific game controller
     * called as super() to initialize and handle basic functionality
     * @class GameController
     * @param {string} gameTypeId 
     * @param {PlayerController} playerController 
     * @param {GameInfo} gameInProgress 
     */
    constructor(gameTypeId, playerController, gameInProgress=undefined){
        
        this._data = {
            playerController: playerController,
            gameMatcher: gameInProgress ? undefined : new GameMatcher(gameTypeId, playerController.getPlayerId(), (data)=>this._startGame(data)),
            gameInfo: gameInProgress,
        }
    }

    /**
     * @function GameController._startGame
     * @private
     * @param {Firebase.database.DataSnapshot} data 
     */
    _startGame(data){
        this._data.gameInfo = new GameInfo(data);
        this._data.gameInfo.addCallback(()=>this._data.playerController.handleUpdate());
    }

    /**
     * @function GameController.getGameInfo
     * @returns {GameInfo} This games GameInfo which provides turns and should be updated with moves through updateInfo({move:{}})
     */
    getGameInfo(){
        return this._data.gameInfo;
    }

};