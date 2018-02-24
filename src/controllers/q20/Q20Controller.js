import GameController from "../common/GameController";
import {ALL_GAMES, GAME_TYPE_Q20} from "../common/Games";

export default class Q20Controller extends GameController{
    
    constructor(playerId, gameInProgress=undefined){
        
        super(GAME_TYPE_Q20, playerId, gameInProgress);

    }

};

if(ALL_GAMES != undefined)
    ALL_GAMES[GAME_TYPE_Q20] = Q20Controller;
