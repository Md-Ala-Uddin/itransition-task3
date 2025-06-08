import { Dice } from "./dice.js";

export class DiceParser {
    static parseArgs(args: string[]): Dice[] {
        const diceArgs = args.slice(2);
        if (diceArgs.length < 3) throw new Error("Atleast 3 dice are required");
        
        if (haveDuplicates(diceArgs))
            throw new Error(
                "Duplicate dice detected, dice can not be identical and need to be non-transitive."
            );

        return diceArgs.map((arg, i) => {
            const parts = arg.split(",").map(Number);
            if (parts.length !== 6 || parts.some(isNaN))
                throw new Error(`Invalid format format for die ${i + 1}, 
            Expected six comma-separated numbers.\n ex: 2,2,4,4,6,6 `);

            return new Dice(parts);
        });
    }
}

function haveDuplicates(diceArgs: string[]) {
    for (let i = 0; i < diceArgs.length; i++) {
        for (let j = i + 1; j < diceArgs.length; j++) {
            if (diceArgs[i] === diceArgs[j]) {
                return true;
            }
        }
    }
}
