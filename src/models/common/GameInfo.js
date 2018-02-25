import firebase from "firebase/app";

export default class GameInfo{
    constructor(gameSnap){
    
        this.data = {
            gameSnap: gameSnap,
            gameRoomSnap: undefined,
            gameOver: false,
            winnerPlayerId: undefined,
            callbackFunctions: []
        }

        console.log("gameinfo, gamesnap", gameSnap);
        
        this.data.roomRef = firebase.database().ref(`/game/${gameSnap.val().gameTypeId}/${gameSnap.val().roomKey}`);
        this.data.roomRef.on("value", ()=> this._dataCallback);

        
        console.log("roomref", this.data.roomRef)
        
        this.data.roomRef.once("value").then(snapshot=>{this._dataCallback(snapshot)});

        //initialize data from firebase based on gameId
       // gameRoomSnap.ref().on("value", this.dataCallback);


    }

    _getGameState(){

        console.log("gameroomsnap", this.data.gameRoomSnap)
        if(this.data.gameRoomSnap)
            return this.data.gameRoomSnap.val();

    }

    updateInfo(state){
        //send info patch to firebase
        this.data.roomRef.push(state);

    }

    isInitialized(){
        return this._getGameState() ? true : false;
    }

    getCurrentPlayerId(){

        if(this.isInitialized()){
            let gameInfo = this._getGameState();

            return gameInfo.players[gameInfo.currentPlayer];
        }

    }

    getWinner(){

    }


    addCallback(callbackFunction){
        
        console.log("adding game info model callback function");
        this.data.callbackFunctions.push(callbackFunction);

    }

    //this callback is intended to be called as a ajax/websocket/fetch handler
    _dataCallback(data)
    {
        this.data.gameRoomSnap = data;
        console.log("callback, gameroomsnap", data.val())
        //distribute the messages (per observer pattern)
        this.data.callbackFunctions.forEach((callback)=> callback());
        
    }
}

