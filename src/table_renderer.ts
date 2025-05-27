import { Dice } from "./dice.js";
import { ProbabilityCalculator } from "./probability_calculator.js";

import { AsciiTable3 as Table } from "ascii-table3";

export class TableRenderer {
    static render(diceArray: Dice[]): void {
        const table = new Table("Dice Win Probabilities");
        const headers = ["User dice v"].concat(diceArray.map((die, i) => `Die ${i + 1}: ${die.faces.join(',')}`));
        table.setHeading(...headers);

        diceArray.forEach((dieA, i) => {
            const row = [`Die ${i + 1}: ${dieA.faces.join(',')}`];
            diceArray.forEach((dieB, j) => {
                row.push(
                    i === j
                        ? `- (${ProbabilityCalculator.winProbability(dieA, dieB)})`
                        : `${ProbabilityCalculator.winProbability(dieA, dieB)}%`
                );
            });
            table.addRow(...row);
        });

        console.log(table.toString());
    }
}
