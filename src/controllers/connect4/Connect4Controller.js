import GameController from "../common/GameController";
import {ALL_GAMES, GAME_TYPE_C4, ContClass} from "../../models/common/Games"

export default class Connect4Controller extends GameController{
    
    constructor(playerController, gameInProgress=undefined){
        
        super(GAME_TYPE_C4.gameTypeId, playerController, gameInProgress);

        
    }

};

if(ALL_GAMES != undefined)
    ALL_GAMES[GAME_TYPE_C4.gameTypeId][ContClass] = Connect4Controller;

