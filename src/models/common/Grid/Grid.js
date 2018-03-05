import {PlayerToken, DIRECTIONS} from './PlayerToken';

export default class Grid{
    constructor(dim, connectionsToWin){
        
        this.dim = dim;
        this.lastIndex = dim-1;
        this.connectionsToWin = connectionsToWin;

        this.grid = [];

        for(let i=0; i<dim; i++){
            let row = [];
            this.grid.push(row);
            for(let j=0; j<dim; j++){
                row.push(null)
            }
        }

    }

    getGrid() {
        return this.grid;
    }

    placeToken(x,y, playerId){
        
        if(x==undefined || y==undefined || playerId == undefined ||
         x < 0 || y < 0 ||
        x > this.lastIndex || y > this.lastIndex){
            console.error("bad call to placeToken");
            return;
        }

        console.log("placetoken, grid", this.grid, x, y);

        let newToken = new PlayerToken(playerId);
        this.grid[x][y] = newToken;

        //define kernel bounds

        let x_1 = x-1;
        //clip left to left bound of grid
        if( x_1 < 0 )
            x_1 = 0;

        let x_2 = x+1;
        //clip right to right bound of grid
        if( x_2 > this.lastIndex )
            x_2 = this.lastIndex;

        let y_1 = y-1;
        //clip top to top bound of grid
        if( y_1 < 0 )
            y_1 = 0;

        let y_2 = y+1;
        //clip bottom to bottom bound of grid
        if( y_2 > this.lastIndex )
            y_2 = this.lastIndex;

        for(let i=x_1; i<x_2; i++){
            for(let j=y_1; j<y_2; j++){
                
                //get the neighboring token
                let neighboringToken = this.grid[i][j];
                
                //skip any null cells in grid
                //skip connecting a token to itself
                if( !neighboringToken || neighboringToken == newToken )
                    continue;

                let direction = i*3+j;

                switch(direction){
                    case 0:
                        neighboringToken.addConnection(DIRECTIONS.UL, newToken);
                        break;
                    case 1:
                        neighboringToken.addConnection(DIRECTIONS.U, newToken);
                        break; 
                    case 2:
                        neighboringToken.addConnection(DIRECTIONS.UR, newToken);
                        break;    
                    case 3:
                        neighboringToken.addConnection(DIRECTIONS.L, newToken);
                        break;
                    case 4:
                        console.error("Cannot connect a token to itself");
                        break; 
                    case 5:
                        neighboringToken.addConnection(DIRECTIONS.R, newToken);
                        break;
                    case 6:
                        neighboringToken.addConnection(DIRECTIONS.BL, newToken);
                        break;
                    case 7:
                        neighboringToken.addConnection(DIRECTIONS.B, newToken);
                        break; 
                    case 8:
                        neighboringToken.addConnection(DIRECTIONS.BR, newToken);
                        break;
                    default:
                        console.error("Bad direction calculation in Grid");
                        break;
                }

            }//close col (j) loop
        }//close row (i) loop
    
        //check for a win
        return this.checkForWin(newToken);
    }

    //this is called from placeToken, it shouldnt need to be explicitly called
    checkForWin(fromToken){
        
        const TOWARDS_BEGINNING = 0;
        const TOWARDS_END = 0;

        //potentially a win in one of four directions
        const winDirections = [
            //from top to bottom ( like | )
            [DIRECTIONS.U, DIRECTIONS.B],
            
            //from upper left to bottom right (like \ )
            [DIRECTIONS.UL, DIRECTIONS.BR],

            //from left to right (like - )
            [DIRECTIONS.L, DIRECTIONS.R],

            //from bottom left to upper right (like / )
            [DIRECTIONS.BL, DIRECTIONS.UR], 
        ];

        for(let curDirection = 0; curDirection < winDirections.length; curDirection++){
            
            //reset the current connection count whenever starting a new direction
            let currentConnectionCount = 0;

            //start from the specified PlayerToken
            let currentToken = fromToken;

            //prep for iterating linked list style connections between tokens
            let nextToken = null;

            //move toward one bound.... kind of like moving to the root of a tree...
            do {
                
                nextToken = currentToken.getConnection(winDirections[curDirection][TOWARDS_BEGINNING]);

                if(nextToken)
                    currentToken = nextToken;

            } while(nextToken);

            //once at that bound, move in the opposite direction, counting tokens
            do{

                currentConnectionCount++;
                nextToken = currentToken.getConnection(winDirections[curDirection][TOWARDS_END]);
                if(nextToken)
                    currentToken = nextToken;

            } while(nextToken);

            //if enough tokens were counted, it's already a win
            if( currentConnectionCount == this.connectionsToWin )
                return true;
        }

        //no counts of enough tokens were found
        return false;
    }
}