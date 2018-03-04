import GameMatcher from "../common/GameMatcher";
import GameInfo from "../../models/common/GameInfo";
import React from "react";

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
            view: undefined,
        }
    }

    /**
     * @function GameController._startGame
     * @private
     * @param {Firebase.database.DataSnapshot} data 
     */
    _startGame(data){
        this._data.gameInfo = new GameInfo(data);
        this._data.gameInfo.addDataCallback(()=>this._data.playerController.handleUIUpdate());
    }

    /**
     * @function GameController.getGameInfo
     * @returns {GameInfo} This games GameInfo which provides turns and should be updated with moves through updateInfo({move:{}})
     */
    getGameInfo(){
        return this._data.gameInfo;
    }

    getView(){
        return <div>Abstract game view. You need to overload getView() in the game controller</div>;
    }

    unmount(){
        this._data.gameMatcher.unmount();
        this._data.gameInfo.unmount();
    }
};