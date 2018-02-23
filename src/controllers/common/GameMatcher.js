

//https://github.com/firebase/functions-samples/blob/master/limit-children/functions/index.js
export class GameMatcher{
    constructor(game, startGame){
        
        this.game = game;
        this.startGame = startGame;
    
    }

    handleResponse(data){

    }

    match_player(){
        
        fetch("https://us-central1-quickstartsandbox.cloudfunctions.net/match")
        .then(this.handleResponse)
        .then(this.startGame)
        .catch(handleError);

    }
}