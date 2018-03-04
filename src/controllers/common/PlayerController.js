import {ALL_GAMES, ContClass} from "../../models/common/Games";
import {TicTacToeController} from "../tictactoe/TicTacToeController";
import {Connect4Controller} from "../connect4/Connect4Controller";
import {Q20Controller} from "../q20/Q20Controller";
import GameInfo from "../../models/common/GameInfo";

import firebase from "firebase/app";

export default class PlayerController{

    
    /**
     * @description The app creates one PlayerController to initiate signing in, providing user info like name and player id, 
     * @description determines states like isPlayingGame(), isWaitingForMatch(), isCurrentPlayer(), also starts a newGame() from GameChooser
     * @class PlayerController
     * @param {array} callbacks 
    */
    constructor(callbacks=[]){
        
        this.data = {
                playerId: undefined,
                displayName: undefined,
                games: [],
                callbacks: callbacks
        }

        this.unlistenAuth = firebase.auth().onAuthStateChanged(user => {
            if(user) {

                this.data.playerId = user.uid;
                
                if(user.displayName == undefined){
                    
                    fetch("https://us-central1-ken-info343-final.cloudfunctions.net/randomName").then((data)=>{
                        return data.json();
                    }).then(data=> {
                    
                        firebase.auth().currentUser.updateProfile({displayName: data.name}).catch(err=>console.error(err));
                        
                        console.log("sent new displayname: " + data.name);

                        this.data.displayName = user.displayName;
                        this.handleUpdate();
                        
                    });
                }

                this.data.displayName = user.displayName;
                
                this.handleUpdate();

                //grave, backtick
                this.users_gamesRef = firebase.database().ref(`/users/${user.uid}/game_rooms`);
        
                // this.valueListener = this.users_gamesRef.once("value", snapshot => {
                //
                //     this.data.gamesSnap = snapshot;
                //
                //     snapshot.forEach(game_room => {
                //
                //         let existingGame = ALL_GAMES[game_room.val().gameTypeId][ContClass];
                //
                //         let existingGameInfo = new GameInfo(game_room);
                //
                //         existingGameInfo.addCallback(()=>this.handleUpdate());
                //
                //         this.data.games.push( new existingGame(this, existingGameInfo) );
                //
                //         this.handleUpdate();
                //     });
                // });
              }
          });

        firebase.auth().signInAnonymously();
    }

    /** 
     * @public
     * @function PlayerController.getName
     * @returns User's friendly display name
    */
    getName(){
        return this.data.displayName;
    }

    /**
     * @public
     * @function PlayerController.getPlayerId
     * @returns User's internal playerId
     */
    getPlayerId(){
        return this.data.playerId;
    }

    /**
     * @public
     * @function PlayerController.unmount
     * @description Should be called when the main App View unmounts
     */
    unmount(){
        this.unlistenAuth();
        this.users_gamesRef.off("value", this.valueListener);
    }

    /**
     * @public
     * @function PlayerController.addCallback
     * @param {closure} callback 
     */
    addCallback(callback){
        this.data.callbacks.push(callback);
    }

    /**
     * @public
     * @function PlayerController.handleUpdate
     * @description Propagates calls to update callbacks for all obsevers that have registered through addCallback
     */
    handleUpdate(){
        this.data.callbacks.forEach((callback)=> {callback()});
    }

    /**
     * @public
     * @function PlayerController.newGame
     * @param {GameController} gameControllerClass 
     */
    newGame(gameControllerClass){
        
        this.data.games.push(new gameControllerClass(this));
        this.handleUpdate();

    }

    /**
     * @public
     * @function PlayerController.getGame
     * @description Get the current game the player should be playing
     */
    getGame(){
        console.log("getGame", this.data.games[0])
        return this.data.games[0];
    }

    /**
     * @public
     * @function PlayerController.isCurrentPlayer
     * @description Is it this players turn?
     */
    isCurrentPlayer(){
        let gameInfo = this.getGame().getGameInfo();

        return this.data.playerId == gameInfo.getCurrentPlayerId();
    }

    /**
     * @public
     * @function PlayerController.isPlayingGame
     * @description Is a game already selected and in some stage of being played (even waiting for a match)
     */
    isPlayingGame(){
        let gameInfo = this.getGame();
        return gameInfo != undefined;
    }

    /**
     * @public
     * @function PlayerController.isWaitingForMatch
     * @description Is the player waiting for a match with another player
     */
    isWaitingForMatch(){

        console.log("figuring out waiting state",  this.isPlayingGame() )
        if(this.isPlayingGame())
            console.log("gameinfo", this.getGame().getGameInfo())

        return this.isPlayingGame() && !this.getGame().getGameInfo();
    }

}

