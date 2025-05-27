import { Dice } from "./dice.js";

export class DiceParser {
    static parseArgs(args: string[]): Dice[] {
        const diceArgs = args.slice(2);
        if (diceArgs.length < 3) throw new Error("Atleast 3 dice are required");
        
        return diceArgs.map((arg, i) => {
            const parts = arg.split(",").map(Number);
            if (parts.length !== 6 || parts.some(isNaN))
                throw new Error(`Invalid format format for die ${i + 1}, 
            Expected six comma-separated numbers.\n ex: 2,2,4,4,6,6 `);

            return new Dice(parts);
        });
    }
}
