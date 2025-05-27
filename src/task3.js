import { DiceParser } from './dice_parser.js';
import { TableRenderer } from './table_renderer.js';
import { GameEngine } from './game_engine.js';

(async function main() {
 try {
    const diceArray = DiceParser.parseArgs(process.argv);
    const game = new GameEngine(diceArray);
    await game.start();
 } catch( err ) {
    console.log( err );
 }
})();