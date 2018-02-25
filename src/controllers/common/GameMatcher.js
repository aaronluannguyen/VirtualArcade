import firebase from "firebase/app";

export default class GameMatcher{

    constructor(gameTypeId, playerId, startGame){
        
        //add listener under player for list of games player is in, this will be called to start the appropriate game
        //when the player

        console.log("setting up game match");

        this._valueListener = firebase.database().ref(`/users/${playerId}/game_rooms`).on("child_added", snapshot => {

            
            let value = snapshot.val();

            if(value){
                
                //value = value[Object.keys(value)[0]];
                console.log("game room value updated, gamematcher, ", value, gameTypeId, value.gameTypeId);
                
                //figure out if theres a better way to do this by API or by ref, type of on?
                

                if(value.gameTypeId == gameTypeId)
                    startGame(snapshot);
            }
        });

        //add player to the specified game lobby, this should trigger the Firebase Cloud Function if there are enough
        //players, move them to a new room, and add the room under the player's /game_rooms, which will start the game
        //if there is only one player, the lambda will be called with the snapshot when the second player enters the room
        firebase.database().ref(`/lobby/${gameTypeId}`).push({playerId: playerId});
    }
}