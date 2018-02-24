//based on https://github.com/firebase/functions-samples/blob/master/limit-children/functions/index.js

const functions = require('firebase-functions');

//haven't found a way to import or otherwise include these into the cloud function, so they need to be updated there despite efforts towards DRY

const GAME_TYPE_C4 = "C4";
const GAME_TYPE_Q20 = "Q20";

//types of GameControllers will be added to this object 
const ALL_GAMES = {};
ALL_GAMES[GAME_TYPE_C4]= undefined;
ALL_GAMES[GAME_TYPE_Q20]= undefined;

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Max number of users in lobby
const USERS_PER_GAME = 2;



// Removes siblings of the node that element that triggered the function if there are more than MAX_LOG_COUNT.
// In this example we'll keep the max number of chat message history to MAX_LOG_COUNT.
function onLobbyWrite(event, gameTypeId){
    const parentRef = event.data.ref.parent;
    
    return parentRef.once('value').then((snapshot) => {
        
        if (snapshot.numChildren() >= USERS_PER_GAME) {
            let childCount = 0;
            const updates = {};
            const users = [];
      
            snapshot.forEach((child) => {
                    if(users.length < USERS_PER_GAME){
                        users.push( child.val().playerId );
            
                        //remove from lobby
                        updates[child.key] = null;
                    }
            });

            let games = functions.database.ref(gameTypeId+"/game/");
        
            let newRoom = {
                gameTypeId: gameTypeId,
                0: users[0],
                1: users[1]
            }

            //create new game room by adding the two users
            let newRoomRef = games.push(newRoom);
            
            //add room under each users current games
            for(let i=0; i<users.length; i++){

                let user_games = functions.database.ref("/users/"+users[i]+"/game_rooms/");
                user_games.push(newRoomRef.key);
            
            }

                // Update the parent. This effectively removes the extra children.
                return parentRef.update(updates);
            }

        return null;
    });

}
Object.keys(ALL_GAMES).forEach((game)=>
    exports[game] = functions.database.ref(game+"/lobby").onWrite((event) => {
        onLobbyWrite(event, game) } ));