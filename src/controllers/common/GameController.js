import GameMatcher from "../common/GameMatcher";
import GameInfo from "../common/GameInfo";

export default class GameController{
    constructor(gameTypeId, playerId, gameInProgress=undefined){
        
        this._data = {
            gameMatcher: gameInProgress ? new GameMatcher(gameTypeId, playerId, this.startGame) : undefined,
            gameInfo: gameInProgress,
        }

    }

    requestGame(){
        this._data.gameMatcher.match_player();
    }

    startGame(data){
        this._data.gameInfo = new GameInfo(data);
    }

};