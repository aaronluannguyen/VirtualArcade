export const DIRECTIONS = {
        UL: "ul",
        U: "u",
        UR: "ur",
        L: "l",
        R: "r",
        BL: "bl",
        B: "b",
        BR: "br",
    }

export class PlayerToken{
    constructor(playerId){

        //this identifies the player associated with the given token
        this.playerId = playerId;
        
        //these will link the tokens in a grid, just to the next one touching...
        //they are like a linked list
        //detecting a win will occur by iterating over the same "direction" for the specified number of tokens "in a row"
        this.connections = {
            ul: null,
            u:  null,
            ur: null,
            l:  null,
            r:  null,
            bl: null,
            b:  null,
            br: null,
        };
    }

    addConnection(direction, token) {
        
        //only connect tokens belonging to the same player
        if(token.playerId != this.playerId)
            return;

        //if the specified direction, is a valid direction
        if(Object.keys(DIRECTIONS).includes(direction)) {
        
            //store a reference to the provided token for the speicifed direction
            this.connections[direction]=token;
        }
    }

    getConnection(direction) {
        
        return this.connections[direction];

    }

}