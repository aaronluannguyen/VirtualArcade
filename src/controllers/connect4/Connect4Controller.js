import GameController from "../common/GameController";
import {ALL_GAMES, GAME_TYPE_C4} from "../common/Games"

export default class Connect4Controller extends GameController{
    
    constructor(playerId, gameInProgress=undefined){
        
        super(GAME_TYPE_C4, playerId, gameInProgress);

    }

};

if(ALL_GAMES != undefined)
    ALL_GAMES[GAME_TYPE_C4] = Connect4Controller;

