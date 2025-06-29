import { CliHandler } from "./cli_handler.js";
import { FairRandomProtocol } from "./fair_random_protocol.js";
import { RandomGenerator } from "./random_generator.js";
import { Dice } from "./dice.js";

export class GameEngine {
    private diceArray: Dice[];

    constructor(diceArray: Dice[]) {
        this.diceArray = diceArray;
    }

    async start(): Promise<void> {
        let cli = new CliHandler(this.diceArray);
        while (true) {
            const first = await FairRandomProtocol.decideFirstMove(cli);
            console.log(`${first} go first`);

            if (first === "I") {
                const myDieIndex = RandomGenerator.secureRandomInt(
                    0,
                    this.diceArray.length - 1
                );
                const myDie = this.diceArray[myDieIndex];
                console.log(`I make the first move and choose the ${myDie} dice`);
                const remainingDice = this.diceArray.filter(
                    (die) => die.faces.join("") != myDie.faces.join("")
                );
                const yourDieIndex = await cli.askForChoice(
                    `Choose your die`,
                    Object.fromEntries(
                        remainingDice.map((die, i) => [i, die.faces.join(",")])
                    )
                );
                const yourDie = remainingDice[yourDieIndex as unknown as number];

                console.log(`Your selection: ${yourDieIndex}`);
                console.log(`Your choose the [${yourDie}] die`);

                const myRoll = await myDie.roll(cli);
                console.log(`My roll result is ${myRoll}`);
                console.log("It's time for your roll");
                const yourRoll = await yourDie.roll(cli);
                console.log(`Your roll result is ${yourRoll}`);
                if (myRoll > yourRoll) {
                    console.log(`I win (${myRoll} > ${yourRoll})!`);
                } else if (myRoll < yourRoll) {
                    console.log(`You win (${yourRoll} > ${myRoll})!`);
                } else {
                    console.log(`It's a tie (${myRoll} = ${yourRoll})!`);
                }
            } else {
                const yourDieIndex = await cli.askForChoice(
                    `Choose your die`,
                    Object.fromEntries(
                        this.diceArray.map((die, i) => [i, die.faces.join(",")])
                    )
                );
                const yourDie = this.diceArray[yourDieIndex as unknown as number];
                console.log(`Your selection: ${yourDie}`);
                console.log(`You choose the ${yourDie} die`);

                const remainingDice = this.diceArray.filter(
                    (_, i) => i !== yourDieIndex as unknown as number
                );
                console.log(`My turn`);
                const myDieIndex = RandomGenerator.secureRandomInt(
                    0,
                    remainingDice.length - 1
                );
                const myDie = remainingDice[myDieIndex];
                console.log(`I choose the ${myDie} die`);

                console.log(`It's time for your roll`);
                const yourRoll = await yourDie.roll(cli);
                console.log(`Your roll result is ${yourRoll}`);

                console.log(`It's time for my roll`);
                const myRoll = await myDie.roll(cli);
                console.log(`My roll result is ${myRoll}`);

                if (myRoll > yourRoll) {
                    console.log(`I win (${myRoll} > ${yourRoll})!`);
                } else if (myRoll < yourRoll) {
                    console.log(`You win (${yourRoll} > ${myRoll})!`);
                } else {
                    console.log(`It's a tie (${myRoll} = ${yourRoll})!`);
                }
            }

            const continueGame = await cli.askForChoice(
                "Do you want to play again?",
                { y: "Yes", x: "Exit" }
            );
            if (continueGame === "x") {
                console.log("Exiting the game...");
                break;
            }
        }

        CliHandler.closeAllReadlines();
        return;
    }
}
