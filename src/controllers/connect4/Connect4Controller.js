import GameController from "../common/GameController";
import {ALL_GAMES, GAME_TYPE_C4, ContClass} from "../../models/common/Games"

export default class Connect4Controller extends GameController{
    /**
     * @description Controller to handle UI input for Connect 4
     * @public
     * @class Connect4Controller
     * @extends GameController
     * @param {PlayerController} playerController 
     * @param {GameInfo} gameInProgress 
     */
    constructor(playerController, gameInProgress=undefined){
        
        super(GAME_TYPE_C4.gameTypeId, playerController, gameInProgress);

    }

};

//adds this controller to the global list of all game data
if(ALL_GAMES != undefined)
    ALL_GAMES[GAME_TYPE_C4.gameTypeId][ContClass] = Connect4Controller;

