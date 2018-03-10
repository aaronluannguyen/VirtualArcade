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
            gameMatcher: undefined,
            gameInfo: gameInProgress,
            view: undefined,
            createdAt: Date.now(),
        }

        //moved here since it looks like the instruction queue can call this._startGame() before this._data has completed construction?
        this._data.gameMatcher = gameInProgress ? undefined : new GameMatcher(gameTypeId, {playerId: playerController.getPlayerId(), displayName: playerController.getName()}, (data)=>this._startGame(data));

    }

    /**
     * @function GameController._startGame
     * @private
     * @param {Firebase.database.DataSnapshot} data 
     */
    _startGame(data){

        if(this._data==undefined){
            console.error("undefined _data member", this._data.createdAt);
            return;
        }

        this._data.gameInfo = new GameInfo(data);
        
        
        if(this.startGame){
            this.startGame(this._data.gameInfo);
        }

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

        if(this._data.gameMatcher){
            this._data.gameMatcher.unmount();
        }
        
        this._data.gameInfo.unmount();
    }

    forfeitGame(playerId){
        this._data.gameInfo.forfeitGame(playerId);
    }

    handleUIUpdate(){
        this._data.playerController.handleUIUpdate();
    }

    getPlayerId(){
        return this._data.playerController.getPlayerId();
    }
};