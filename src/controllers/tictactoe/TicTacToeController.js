import GameController from "../common/GameController";
import {ALL_GAMES, GAME_TYPE_TTT, ContClass} from "../../models/common/Games";
import TicTacToe from "../../views/tictactoe/TicTacToe";
import React from "react";
import { GridBoardGame } from "../common/GridBoardGame";
import Connect4Controller from "../connect4/Connect4Controller";

export default class TicTacToeController extends GameController {
    /**
     * @description Controller to handle UI input for Connect 4
     * @public
     * @class Connect4Controller
     * @extends GameController
     * @param {PlayerController} playerController
     * @param {GameInfo} gameInProgress
     */
    constructor(playerController, gameInProgress=undefined){

        super(GAME_TYPE_TTT.gameTypeId, playerController, gameInProgress);

        //console.log(playerController.getGame());
        if(gameInProgress)
            this.gbg = new GridBoardGame(gameInProgress, 3, 3);

    }

    getView(){
        //console.log("getview");
        return <TicTacToe pC={this._data.playerController}/>;
    }
};

if(ALL_GAMES != undefined)
    ALL_GAMES[GAME_TYPE_TTT.gameTypeId][ContClass] = Connect4Controller;