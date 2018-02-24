import firebase from "firebase/app";

export class GameMatcher{

    constructor(gameTypeId, playerId, startGame){
        
        //add listener under player for list of games player is in, this will be called to start the appropriate game
        //when the player
        this._valueListener = firebase.database.ref(`/users/${playerId}/game_rooms`).on("value", snapshot => {
            
            if(snapshot.val().gameTypeId == gameTypeId)
                startGame(snapshot);

        });

        //add player to the specified game lobby, this should trigger the Firebase Cloud Function if there are enough
        //players, move them to a new room, and add the room under the player's /game_rooms, which will start the game
        //if there is only one player, the lambda will be called with the snapshot when the second player enters the room
        firebase.database.ref(`${gameTypeId}/lobby`).push({playerId: playerId});
    }
}