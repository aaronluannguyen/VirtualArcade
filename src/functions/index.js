/**
 * (not really a namespace) not accessible directly in code, either act on data trigger or as a published https endpoint
 * @namespace cloudfunctions
 */

const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
// Allows creating new ref() and push() in cloud functions (like firebase.database on clientside)
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

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
/**@private*/
const USERS_PER_GAME = 2;

/**
 * Removes siblings of the node that element that triggered the function if there are more than USERS_PER_GAME.
 * Based on https://github.com/firebase/functions-samples/blob/master/limit-children/functions/index.js
 * @namespace cloudfunctions
 * @function cloudfunctions.onLobbyWrite
 * @param {functions.Event} event 
 * @param {functions.database.DeltaSnapshot} event.data  
 * @param {string} gameTypeId 
 */
function onLobbyWrite(event, gameTypeId){
    const parentRef = event.data.ref.parent;
    
    return parentRef.once('value').then((snapshot) => {
        
        console.log("checking if there are enough users in lobby")

        console.log(snapshot.numChildren());
        console.log(snapshot.val());

        if (snapshot.numChildren() >= USERS_PER_GAME) {
            
            console.log("enough users in lobby");

            let childCount = 0;
            const updates = {};
            const users = [];
      
            snapshot.forEach((child) => {
            
                    console.log("iterating ", child)
                    
                    if(users.length < USERS_PER_GAME){
                        users.push( child.val().playerId );
            
                        //remove from lobby
                        updates[child.key] = null;
                    }

            });

            let games = admin.database().ref("/game/"+gameTypeId);
        
            let newRoom = {
                gameTypeId: gameTypeId,
                players:    [  
                                users[0],
                                users[1]
                            ],
                currentPlayer: Math.floor(Math.random()*2),
            }

            console.log("creating new game room");
            //create new game room by adding the two users
            let newRoomRef = games.push(newRoom);
            newRoomRef.push("actions");
            
            //add room under each users current games
            for(let i=0; i<users.length; i++){
                
                console.log("creating new referenes to room under users")
                let user_games = admin.database().ref("/users/"+users[i]+"/game_rooms/");
                user_games.push({roomKey: newRoomRef.key, gameTypeId: gameTypeId});
            
            }

            console.log("returning parent ref to update with removed children")
            // Update the parent. This effectively removes the extra children.
            return parentRef.update(updates);
        }

        console.log("not enough users in lobby");
        return false;
    });

}

/**
 * Basic template name for cloud functions, creates an export to call onLobbyWrite for each game Id lobby ref path
 * @namespace cloudfunctions
 * @function cloudfunctions.gameName_match 
 */
//iterate all game keys in ALL_GAMES object and create an ref onWrite data trigger to handle matching players from each games lobby
Object.keys(ALL_GAMES).forEach((game)=>
    exports[game+"_match"] = functions.database.ref("/lobby/"+game+"/{match_requst}").onWrite((event) => {
        onLobbyWrite(event, game) } ));

const adjective = [
    'aback',
    'abaft',
    'abandoned',
    'abashed',
    'aberrant',
    'abiding',
    'abject',
    'ablaze',
    'able',
    'abnormal',
    'aboard',
    'aboriginal',
    'abounding',
    'abrasive',
    'abrupt',
    'absent',
    'absorbed',
    'abstracted',
    'absurd',
    'abundant',
    'acceptable',
    'accessible',
    'accidental',
    'accurate',
    'acidic',
    'acoustic',
    'acrid',
    'actual',
    'adamant',
    'adaptable',
    'adjoining',
    'adorable',
    'adventurous',
    'aggressive',
    'agreeable',
    'alert',
    'alleged',
    'alluring',
    'aloof',
    'amazing',
    'ambiguous',
    'ambitious',
    'amused',
    'amusing',
    'ancient',
    'angry',
    'animated',
    'aquatic',
    'aspiring',
    'astonishing',
    'attractive',
    'auspicious',
    'automatic',
    'available',
    'awake',
    'aware',
    'awesome',
    'axiomatic',
    'bashful',
    'bawdy',
    'beautiful',
    'beneficial',
    'berserk',
    'best',
    'bewildered',
    'big',
    'billowy',
    'bizarre',
    'black',
    'blue',
    'blushing',
    'boiling',
    'bouncy',
    'boundless',
    'brainy',
    'brave',
    'brawny',
    'breezy',
    'brief',
    'bright',
    'broad',
    'broken',
    'brown',
    'calculating',
    'calm',
    'capable',
    'capricious',
    'careful',
    'caring',
    'cautious',
    'ceaseless',
    'certain',
    'charming',
    'cheerful',
    'childlike',
    'chilly',
    'chivalrous',
    'classy',
    'clean',
    'clear',
    'clever',
    'cloudy',
    'coherent',
    'colorful',
    'colossal',
    'combative',
    'comfortable',
    'complete',
    'complex',
    'conscious',
    'cool',
    'cooperative',
    'coordinated',
    'courageous',
    'craven',
    'crazy',
    'creepy',
    'cuddly',
    'cultured',
    'curious',
    'curvy',
    'cute',
    'cynical',
    'daffy',
    'dangerous',
    'dapper',
    'dark',
    'dashing',
    'dazzling',
    'debonair',
    'decisive',
    'decorous',
    'deep',
    'deeply',
    'defiant',
    'delicate',
    'delicious',
    'delightful',
    'detailed',
    'determined',
    'didactic',
    'different',
    'diligent',
    'discreet',
    'distinct',
    'disturbed',
    'divergent',
    'dizzy',
    'draconian',
    'dramatic',
    'dusty',
    'dynamic',
    'eager',
    'early',
    'earthy',
    'easy',
    'economic',
    'educated',
    'efficacious',
    'efficient',
    'elastic',
    'elated',
    'electric',
    'elegant',
    'elite',
    'eminent',
    'enchanted',
    'enchanting',
    'encouraging',
    'endurable',
    'energetic',
    'enormous',
    'entertaining',
    'enthusiastic',
    'envious',
    'equable',
    'equal',
    'ethereal',
    'evanescent',
    'evasive',
    'excellent',
    'excited',
    'exciting',
    'exclusive',
    'exotic',
    'expensive',
    'exuberant',
    'exultant',
    'fabulous',
    'faded',
    'fair',
    'faithful',
    'familiar',
    'famous',
    'fanatical',
    'fancy',
    'fantastic',
    'far',
    'fascinated',
    'fast',
    'fearless',
    'festive',
    'fierce',
    'fine',
    'flashy',
    'flawless',
    'flowery',
    'fluffy',
    'fluttering',
    'foamy',
    'fortunate',
    'free',
    'freezing',
    'frequent',
    'fresh',
    'friendly',
    'frightening',
    'full',
    'functional',
    'funny',
    'furry',
    'furtive',
    'future',
    'futuristic',
    'fuzzy',
    'gabby',
    'gainful',
    'general',
    'gentle',
    'giant',
    'giddy',
    'gifted',
    'gigantic',
    'glamorous',
    'gleaming',
    'glib',
    'glistening',
    'glorious',
    'glossy',
    'good',
    'goofy',
    'gorgeous',
    'graceful',
    'grandiose',
    'grateful',
    'gray',
    'great',
    'green',
    'grey',
    'groovy',
    'guiltless',
    'gusty',
    'habitual',
    'hallowed',
    'halting',
    'handsome',
    'handy',
    'hanging',
    'happy',
    'hard',
    'harmonious',
    'heady',
    'healthy',
    'heartbreaking',
    'heavenly',
    'heavy',
    'helpful',
    'helpless',
    'hesitant',
    'high',
    'highfalutin',
    'hilarious',
    'historical',
    'holistic',
    'hollow',
    'homely',
    'honorable',
    'hospitable',
    'hot',
    'huge',
    'hulking',
    'humorous',
    'hungry',
    'hurried',
    'hushed',
    'husky',
    'hypnotic',
    'hysterical',
    'icy',
    'illustrious',
    'imaginary',
    'immense',
    'imminent',
    'impartial',
    'important',
    'impossible',
    'incandescent',
    'inconclusive',
    'industrious',
    'incredible',
    'infamous',
    'innocent',
    'inquisitive',
    'insidious',
    'instinctive',
    'intelligent',
    'interesting',
    'invincible',
    'jazzy',
    'jolly',
    'joyous',
    'judicious',
    'juicy',
    'keen',
    'kind',
    'knotty',
    'knowing',
    'knowledgeable',
    'large',
    'laughable',
    'lavish',
    'lean',
    'learned',
    'light',
    'likeable',
    'literate',
    'little',
    'lively',
    'long',
    'longing',
    'loose',
    'loud',
    'lovely',
    'loving',
    'lucid',
    'lucky',
    'ludicrous',
    'lush',
    'luxuriant',
    'lying',
    'lyrical',
    'macabre',
    'magenta',
    'magical',
    'magnificent',
    'majestic',
    'mammoth',
    'massive',
    'marvelous',
    'mature',
    'meaty',
    'meek',
    'mellow',
    'melodic',
    'melted',
    'merciful',
    'mighty',
    'mindless',
    'misty',
    'mixed',
    'modern',
    'momentous',
    'motionless',
    'mountainous',
    'mundane',
    'murky',
    'mysterious',
    'natural',
    'neat',
    'nebulous',
    'necessary',
    'neighborly',
    'nice',
    'nifty',
    'nimble',
    'nonchalant',
    'nondescript',
    'nonstop',
    'normal',
    'nostalgic',
    'nutty',
    'obedient',
    'observant',
    'oceanic',
    'omniscient',
    'onerous',
    'optimal',
    'orange',
    'organic',
    'outgoing',
    'outrageous',
    'outstanding',
    'overjoyed',
    'overt',
    'panoramic',
    'parallel',
    'parsimonious',
    'pastoral',
    'peaceful',
    'penitent',
    'perfect',
    'periodic',
    'permissible',
    'perpetual',
    'petite',
    'picayune',
    'pink',
    'piquant',
    'placid',
    'plausible',
    'pleasant',
    'plucky',
    'pointless',
    'poised',
    'polite',
    'powerful',
    'precious',
    'premium',
    'pretty',
    'prickly',
    'productive',
    'protective',
    'psychedelic',
    'purple',
    'purring',
    'puzzling',
    'quaint',
    'quick',
    'quiet',
    'quirky',
    'quixotic',
    'quizzical',
    'rambunctious',
    'rampant',
    'rapid',
    'rare',
    'ready',
    'receptive',
    'recondite',
    'red',
    'redundant',
    'reflective',
    'relieved',
    'remarkable',
    'reminiscent',
    'repulsive',
    'resolute',
    'resonant',
    'responsible',
    'rich',
    'righteous',
    'ritzy',
    'roasted',
    'robust',
    'royal',
    'rural',
    'rustic',
    'sassy',
    'satisfying',
    'savory',
    'scary',
    'scientific',
    'scintillating',
    'screeching',
    'secret',
    'secretive',
    'seemly',
    'selective',
    'separate',
    'serious',
    'shaggy',
    'shaky',
    'shallow',
    'sharp',
    'shiny',
    'shocking',
    'shy',
    'silent',
    'silky',
    'silly',
    'sincere',
    'skillful',
    'sleepy',
    'slim',
    'smart',
    'smiling',
    'smooth',
    'sneaky',
    'solid',
    'sophisticated',
    'sparkling',
    'special',
    'spectacular',
    'spicy',
    'spiffy',
    'spiky',
    'splendid',
    'spooky',
    'spotless',
    'standing',
    'statuesque',
    'steadfast',
    'steady',
    'stimulating',
    'stormy',
    'strange',
    'strong',
    'stupendous',
    'sturdy',
    'subsequent',
    'substantial',
    'successful',
    'succinct',
    'sudden',
    'super',
    'superb',
    'supreme',
    'swanky',
    'sweet',
    'swift',
    'symptomatic',
    'synonymous',
    'tacit',
    'talented',
    'tall',
    'tan',
    'tangible',
    'tangy',
    'tart',
    'tasteful',
    'tasty',
    'tender',
    'terrific',
    'thankful',
    'therapeutic',
    'thoughtful',
    'thundering',
    'tidy',
    'towering',
    'tranquil',
    'tremendous',
    'tricky',
    'true',
    'truthful',
    'ubiquitous',
    'ultra',
    'unbiased',
    'unequaled',
    'unique',
    'unknown',
    'unusual',
    'upbeat',
    'useful',
    'utopian',
    'utter',
    'uttermost',
    'valuable',
    'various',
    'vast',
    'verdant',
    'versed',
    'victorious',
    'vigorous',
    'violet',
    'vivacious',
    'wacky',
    'wandering',
    'warm',
    'wary',
    'watery',
    'wealthy',
    'wet',
    'whimsical',
    'whispering',
    'white',
    'wicked',
    'wiggly',
    'wild',
    'willing',
    'windy',
    'wiry',
    'wise',
    'wistful',
    'witty',
    'wonderful',
    'wooden',
    'yellow',
    'young',
    'yummy',
    'zany',
    'zesty',
    'zippy',
    'zonked'
];

var animal=[
    'Aardvark',
    'Albatross',
    'Alligator',
    'Angelfish',
    'Angler',
    'Anole',
    'Armadillo',
    'Axolotl',
    'AyeAye',
    'Badger',
    'Barracuda',
    'Bass',
    'Bat',
    'Bear',
    'Beaver',
    'Betta',
    'Bison',
    'Blackbird',
    'Bluebird',
    'Bobcat',
    'Bobolink',
    'Bufflehead',
    'Bunting',
    'Carp',
    'Catbird',
    'Catfish',
    'Chameleon',
    'Cheetah',
    'Chickadee',
    'Chipmunk',
    'Chub',
    'Cod',
    'Coot',
    'Cormorant',
    'Cottonmouth',
    'Coyote',
    'Crane',
    'Creeper',
    'Croaker',
    'Crocodile',
    'Crow',
    'Cuckoo',
    'Dog',
    'Dogfish',
    'Dolphin',
    'Dove',
    'Dragon',
    'Duck',
    'Eagle',
    'Eel',
    'Elephant',
    'Elk',
    'Emu',
    'Finch',
    'Flounder',
    'Flycatcher',
    'Fox',
    'Gecko',
    'Gnatcatcher',
    'Goatfish',
    'Goose',
    'Gopher',
    'Gorilla',
    'Grouper',
    'Guppy',
    'Hagfish',
    'Halibut',
    'Harrier',
    'Hawk',
    'Heron',
    'Herring',
    'Houndshark',
    'Hummingbird',
    'Ibis',
    'Iguana',
    'Jackrabbit',
    'Jay',
    'Kangaroo',
    'Kingfisher',
    'Kinglet',
    'Kite',
    'Lamprey',
    'Lark',
    'Lemur',
    'Lion',
    'Loon',
    'Mackerel',
    'Magpie',
    'Mallard',
    'Manatee',
    'Marmot',
    'Merganser',
    'Minnow',
    'Monitor',
    'Monkey',
    'Mouse',
    'Mudskipper',
    'Mullet',
    'Muskrat',
    'Nighthawk',
    'Ocelot',
    'Oriole',
    'Osprey',
    'Owl',
    'Pelican',
    'Pheasant',
    'Phoebe',
    'Pickerel',
    'Pintail',
    'Porcupine',
    'Prairie Dog',
    'Pronghorn',
    'Pupfish',
    'Raccoon',
    'Rat',
    'Rattlesnake',
    'Ray',
    'Robin',
    'Salmon',
    'Sandpiper',
    'Sapsucker',
    'Seal',
    'Sea Lion',
    'Shad',
    'Shark',
    'Sheep',
    'Shiner',
    'Shrew',
    'Skate',
    'Skink',
    'Skunk',
    'Snipe',
    'Snoek',
    'Sparrow',
    'Spookfish',
    'Squirrel',
    'Stargazer',
    'Starling',
    'Stoat',
    'Stonecat',
    'Sucker',
    'Swampfish',
    'Sweeper',
    'Swift',
    'Tapetail',
    'Tarpon',
    'Teal',
    'Tegu',
    'Tench',
    'Tetra',
    'Thrasher',
    'Thrush',
    'Tiger',
    'Toadfish',
    'Tortoise',
    'Trout',
    'Tuna',
    'Turtle',
    'Unicorn',
    'Viper',
    'Vireo',
    'Vole',
    'Vulture',
    'Wahoo',
    'Walrus',
    'Warbler',
    'Waxwing',
    'Weasel',
    'Weever',
    'Whale',
    'Whiff',
    'Wigeon',
    'Willet',
    'Wobbegong',
    'Woodpecker',
    'Wren',
    'Yellowtail',
    'Zander',
    'Zebra',
    'Zingel'
];

/** 
 * publishes an HTTPS, any CORS origin, randomName AJAX endpoint
 * @namespace cloudfunctions
 * @function cloudfunctions.randomName 
*/

//publish an https endpoint that returns a random user name, sends the cors allow any origin header for client browser fetch requests
exports.randomName = functions.https.onRequest((request, resp)=>{

    //response.send("hello");

    let adj = adjective[Math.floor(Math.random()*adjective.length)];
    adj = adj[0].toUpperCase()+adj.slice(1, adj.length);

    let an = animal[Math.floor(Math.random()*animal.length)];
    an = an[0].toUpperCase()+an.slice(1, an.length);

    let name = adj + an;

    resp.set("Content-Type", "text/plain");
    resp.set("Access-Control-Allow-Origin","*");
    resp.send(JSON.stringify({name: name}));

});