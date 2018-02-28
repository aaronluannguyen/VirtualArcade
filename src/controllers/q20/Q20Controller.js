import GameController from "../common/GameController";
import {ALL_GAMES, GAME_TYPE_Q20, ContClass} from "../../models/common/Games";

export default class Q20Controller extends GameController{
    /**
     * @description Controller to handle UI input for 20 Questions
     * @public
     * @class Q20Controller
     * @extends GameController
     * @param {PlayerController} playerController 
     * @param {GameInfo} [gameInProgress=undefined]
     */
    constructor(playerController, gameInProgress=undefined){
        
        super(GAME_TYPE_Q20.gameTypeId, playerController, gameInProgress);

    }

};

//adds this controller to the global list of all game data
if(ALL_GAMES != undefined)
    ALL_GAMES[GAME_TYPE_Q20.gameTypeId][ContClass] = Q20Controller;
