import firebase from "firebase/app";

export default class GameInfo{
    /**
     * Encapsulates connection to Firebase and provides interfaces for other code
     * @class GameInfo
     * @param {firebase.database.DataSnapshot} gameSnap Child DataSnapShot of /users/{user_id}/game_rooms (i.e. {gameTypeId: id, roomKey: ref_key})
     */
    constructor(gameSnap){
    
        /**
         * @private
         */
        this.data = {
            gameSnap: gameSnap,
            gameRoomSnap: undefined,
            gameOver: false,
            winnerPlayerId: undefined,
            callbackFunctions: []
        }

        console.log("gameinfo, gamesnap", gameSnap);
        
        //begin watching the actual game room
        this.data.roomRef = firebase.database().ref(`/game/${gameSnap.val().gameTypeId}/${gameSnap.val().roomKey}`);
        this.data.roomRef.on("value", ()=> this._dataCallback);

        console.log("roomref", this.data.roomRef)
        
        //initialize data from firebase based on snapshot
        this.data.roomRef.once("value").then(snapshot=>{this._dataCallback(snapshot)});

    }

    /**
     * Internal abstraction in case firebase layout needs to change
     * @private
     */
    _getGameState(){

        //console.log("gameroomsnap", this.data.gameRoomSnap)

        if(this.data.gameRoomSnap)
            return this.data.gameRoomSnap.val();

    }

    /**
     * @function GameInfo.updateInfo
     * @param {Object} state Object with key(s)
     *      {
     *          move:{
     *                  playerId:playerId,
     *                  selection:{
     *                  x: x_location,
     *                  y: y_location,
     *                  index: selection_index
     *                  }
     *              }
     *          winner: playerId
     *      }
     * x, y are intended for games where it makes more sense to represent 2d
     * index is intended for 1d
     * 
     * Win must be verified by both sides on cloud function server
     */
    updateInfo(state){
        //send info patch to firebase
        this.data.roomRef.push(state);

    }

    /**
     * Does this instance contain any remote data yet?
     * @function GameInfo.isInitialized
     * @returns {Boolean} true if internal data is loaded, false if no data has been returned from remote storage
     */
    isInitialized(){
        return this._getGameState() ? true : false;
    }

    /** 
     * Return the id of the player who's turn it is (always the same in 1 player games)
     * @function GameInfo.getCurrentPlayerId
     * @returns {string} internal firebase user.uid, considered playerId throughout the rest of the code
    */
    getCurrentPlayerId(){

        if(this.isInitialized()){
            let gameInfo = this._getGameState();

            return gameInfo.players[gameInfo.currentPlayer];
        }

    }

    /**
     * return winner based on server decision, should match local calculation if no bugs or cheating
     * @function GameInfo.getWinner
     * @returns {string} playerId of winner
     */
    getWinner(){

    }


    /**
     * @function GameInfo.addCallback
     * @param {closure} callbackFunction Should be an argument-less closure ()=>{}
     */
    addCallback(callbackFunction){
        
        console.log("adding game info model callback function");
        this.data.callbackFunctions.push(callbackFunction);

        
    }

    /**
     * this callback is intended to be called as a ajax/websocket/fetch handler
     * @function GameInfo._dataCallback
     * @private
     */
    _dataCallback(data)
    {
        this.data.gameRoomSnap = data;
        console.log("callback, gameroomsnap", data.val())
        //distribute the messages (per observer pattern)
        this.data.callbackFunctions.forEach((callback)=> callback(data.val()));
        
    }
}

