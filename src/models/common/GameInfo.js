export class GameInfo{
    constructor(gameId){
    
        this.data = {
            playerIds: [],
            gameId: gameId,
            currentPlayerId: undefined,
            gameOver: false,
            winnerPlayerId: undefined,
            callbackFunctions: []
        }

        //initialize data from firebase based on gameId
    }

    updateInfo(state){
        //send info patch to firebase
    }

    addCallback(callbackFunction){
        
        this.data.callbackFunctions.push(callbackFunction);

    }

    //this callback is intended to be called as a ajax/websocket/fetch handler
    dataCallback(data)
    {
        //distribute the messages (per observer pattern)
        for(let i=0; i<this.data.callbackFunctions.length; i++){
        
            this.data.callbackFunctions[i](data);
        
        }

    }
}

