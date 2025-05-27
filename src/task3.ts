import { DiceParser } from './dice_parser.js';
import { GameEngine } from './game_engine.js';

(async function main() {
 try {
    const diceArray = DiceParser.parseArgs(process.argv);
    const game = new GameEngine(diceArray);
    await game.start();
 } catch( err ) {
    console.log(err);
 }
})();