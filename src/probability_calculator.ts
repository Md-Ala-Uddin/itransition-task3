import { Dice } from "./dice.js";

export class ProbabilityCalculator {
    static winProbability(dieA: Dice, dieB: Dice): string {
        const ALL_POSSIBLE_MOVES = dieA.faces.length * dieB.faces.length; // 6 * 6 = 36
        let winCount = 0;

        for( const faceA of dieA.faces) {
            for ( const faceB of dieB.faces) {
                if( faceA > faceB ) winCount++;
            }
        }

        return (winCount/ ALL_POSSIBLE_MOVES * 100).toFixed(4);
    }
}