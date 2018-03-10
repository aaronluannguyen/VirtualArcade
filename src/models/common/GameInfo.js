import firebase from "firebase/app";

export const TIE_CONDITION = "Tie";
export const FORFEIT_CONDITION = "Forfeit";

export default class GameInfo{
    /**
     * Encapsulates connection to Firebase and provides interfaces for other code
     * @class GameInfo
     * @param {firebase.database.DataSnapshot} gameSnap Child DataSnapShot of /users/{user_id}/game_rooms (i.e. {gameTypeId: id, roomKey: ref_key})
     */
    constructor(gameSnap, loadCallback =  ()=>{}){
    
        /**
         * @private
         */
        this.data = {
            staleSnap: true,
            gameSnap: gameSnap,
            gameRoomSnap: undefined,
            gameOver: false,
            callbackFunctions: [],
            localInfo: undefined,
        }
        
        //begin watching the actual game room
        this.data.roomRef = firebase.database().ref(`/game/${gameSnap.val().gameTypeId}/${gameSnap.val().roomKey}`);
        this.data.roomRef.once("value", (data) => {

            if(!data || !data.val())
                return;

            this._handleDataCallback(data); 
           
            loadCallback();

            if(!data.val().winnerPlayerId){
                
                //initialize data from firebase based on snapshot
                //once doesn't need to "unlisten", and nothing is returned
                this._dataValueListener = this.data.roomRef.on("value", snapshot => this._handleDataCallback(snapshot) );
            }
        });

    }

    unmount(){
        this.data.roomRef.off("value", this._dataValueListener);
    }

    forfeitGame(playerId){
        if(this.getWinner() === undefined)
        {
            this.updateInfo({winnerPlayerId:FORFEIT_CONDITION+":" + playerId});
        }
    }

    /**
     * Internal abstraction in case firebase layout needs to change
     * @private
     */
    _getGameState(){

        if(this.data.gameRoomSnap && !this.data.staleSnap)
            return this.data.gameRoomSnap.val();
        else{
            return this.data.localInfo;
        }

    }

    /**
     * @function GameInfo.updateInfo
     * @param {Object} state Object with key(s)
     *      {   actions:{
     *          move:{
     *                  playerId:playerId,
     *                  selection:{
     *                  x: x_location,
     *                  y: y_location,
     *                  index: selection_index
     *                  }
     *              }
     *          }
     *          currentPlayer: otherPlayerIndex (e.g. 0 or 1 in 2 player )
     *          winnerPlayerId: playerId
     *      }
     * x, y are intended for games where it makes more sense to represent 2d
     * index is intended for 1d
     * 
     * Win must be verified by both sides on cloud function server
     */
    updateInfo(state){
        //send info patch to firebase

        this.data.staleSnap = true;

        let gameState = this._getGameState();

        if(gameState){
            let nextPlayer = (gameState.currentPlayer+1) % gameState.numPlayers;
            
            state.currentPlayer = nextPlayer;
            this.data.localInfo.currentPlayer = nextPlayer;
            
            let move = undefined;
            
            if(state.actions && state.actions.move)
            {
                move = Object.assign(state.actions.move);

                //can't just set state.actions to undefined, firebase will throw an error
                delete state.actions;
            }

            //edge seems to add this to state as undefined if it doesnt exist, using hasOwnProperty to check for presence
            //before checking for value... not the best solution, but it seems to be working
            if(state.hasOwnProperty("winnerPlayerId") && state.winnerPlayerId != undefined) {

                this.data.localInfo.winnerPlayerId = state.winnerPlayerId;

            }

            this.data.roomRef.update(state);

            if(move){
                this.data.roomRef.child("actions").push(move);
            }

        } else { 
            console.error("no game state!");
        }

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



            return gameInfo.players[gameInfo.currentPlayer].playerId;
        }

    }

    getPlayerNumber(playerId){
        let players = this.getPlayers();

        if(this.isInitialized()){
            for(let i=0; i<players.length; i++){
                if(players[i].playerId==playerId)
                    return i;
            } 
        }
    }

    getPlayers(){

        if(this.isInitialized()){
            let gameInfo = this._getGameState();

            return gameInfo.players;
        }
    }

    getName(playerId){
        
        if(this.isInitialized()){
            let gameInfo = this._getGameState();

            let player = gameInfo.players.filter((player)=> player.playerId == playerId);

            if(player.length)
                return player[0].displayName;
        }

    }

    getOpponentName(playerId){

        let allPlayers = this.getPlayers();

        if(!allPlayers)
            return;

        allPlayers.push({
            playerId: "Google", 
            displayName:"Google Cloud Vision"}
        );

        for(let i=0; i<allPlayers.length; i++){

            if(allPlayers[i].playerId!= playerId){

                return allPlayers[i].displayName;

            }

        }

    }

    /**
     * return winner based on server decision, should match local calculation if no bugs or cheating
     * @function GameInfo.getWinner
     * @returns {string} playerId of winner
     */
    getWinner(){
        let winner = undefined;
                
        if(this.isInitialized()){

            winner = this._getGameState().winnerPlayerId;

        }

        return winner;
    }


    /**
     * @function GameInfo.addDataCallback
     * @param {closure} callbackFunction Should be an argument-less closure ()=>{}
     */
    addDataCallback(callbackFunction){
        
        this.data.callbackFunctions.push(callbackFunction);

    }

    /**
     * this callback is intended to be called as a ajax/websocket/fetch handler
     * @function GameInfo._dataCallback
     * @private
     */
    _handleDataCallback(data)
    {
        if(!data || !data.val())
            return;

        this.data.staleSnap = false;
        this.data.gameRoomSnap = data;
        this.data.localInfo = data.val();

        //distribute the messages (per observer pattern)
        this.data.callbackFunctions.forEach((callback)=> callback(data.val()));
        
    }
}

