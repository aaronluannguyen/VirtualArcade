import {ALL_GAMES, ContClass} from "../../models/common/Games";
import {Connect4Controller} from "../connect4/Connect4Controller";
import {Q20Controller} from "../q20/Q20Controller";
import GameInfo from "../../models/common/GameInfo";

import firebase from "firebase/app";


export default class PlayerController{

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
        
                this.valueListener = this.users_gamesRef.once("value", snapshot => {
                    
                    this.data.gamesSnap = snapshot;
                    
                    snapshot.forEach(game_room => {
                        
                        let existingGame = ALL_GAMES[game_room.val().gameTypeId][ContClass];

                        let existingGameInfo = new GameInfo(game_room);

                        existingGameInfo.addCallback(()=>this.handleUpdate());

                        this.data.games.push( new existingGame(this.data.playerId, existingGameInfo) );

                        this.handleUpdate();
                    });
                });
              }
          });

        firebase.auth().signInAnonymously();
    }

    getName(){
        return this.data.displayName;
    }

    getPlayerId(){
        return this.data.playerId;
    }

    unmount(){
        this.unlistenAuth();
        this.users_gamesRef.off("value", this.valueListener);
    }

    addCallback(callback){
        this.data.callbacks.push(callback);
    }

    handleUpdate(){
        this.data.callbacks.forEach((callback)=> {callback()});

    }

    newGame(gameControllerClass){
        
        this.data.games.push(new gameControllerClass(this));
        this.handleUpdate();

    }

    getGame(){
        return this.data.games[0];
    }

    isCurrentPlayer(){
        let gameInfo = this.getGame().getGameInfo();

        return this.data.playerId == gameInfo.getCurrentPlayerId();
    }

    isPlayingGame(){
        let gameInfo = this.getGame();
        return gameInfo != undefined;
    }

    isWaiting(){

        console.log("figuring out waiting state",  this.isPlayingGame() )
        if(this.isPlayingGame())
            console.log("gameinfo", this.getGame().getGameInfo())

        return this.isPlayingGame() && !this.getGame().getGameInfo();
    }

}

