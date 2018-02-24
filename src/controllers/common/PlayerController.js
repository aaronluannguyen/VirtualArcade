import {ALL_GAMES} from "./Games";
import {Connect4Controller} from "../connect4/Connect4Controller";
import {Q20Controller} from "../q20/Q20Controller";
import firebase from "firebase/app";

export default class PlayerController{

    constructor(){
        
        this.data = {
                playerId: undefined,
                displayName: undefined,
        }

        this.unlistenAuth = firebase.auth().onAuthStateChanged(user => {
            if(user) {

                this.data.playerId = user.uid;
                this.data.displayName = user.displayName;
        
                //grave, backtick
                let users_games = firebase.database().ref(`/users/${user.uid}/game_rooms`);
        
                this.valueListener = users_games.on("value", snapshot => {
                    //this.data.gamesSnap = snapshot;
                    /*snapshot.forEach(game_room => {
                        
                        let existingController = ALL_GAMES[game_room.val().gameTypeId];

                        let game = new existingController();
                    });*/
                });
              }
          });

        firebase.auth().signInAnonymously();
    }

}

