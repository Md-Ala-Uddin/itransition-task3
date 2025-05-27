import { CliHandler } from "./cli_handler.js";
import { HMACGenerator } from "./hmac_generator.js";
import { RandomGenerator } from "./random_generator.js";

export class Dice {
    faces: number[];

    constructor(faces: number[]) {
        this.faces = faces;
    }

    async roll(cli: CliHandler): Promise<number> {
        const myNumber = RandomGenerator.secureRandomInt(
            0,
            this.faces.length - 1
        );
        const myKey = RandomGenerator.generateKey();
        const myHMAC = HMACGenerator.generateHMAC(myKey, `${myNumber}`);

        console.log(
            `I selected a random value in the range 0..${this.faces.length - 1}`
        );
        console.log(`(HMAC=${myHMAC})`);

        const yourNumber: number = Number(
            await cli.askForChoice(
                `Add your number modulo ${this.faces.length - 1}`,
                Object.fromEntries(
                    [...Array(this.faces.length)].map((_, i) => [i.toString(), i.toString()])
                )
            )
        );

        console.log(`Your selection ${yourNumber}`);
        console.log(`My number is ${myNumber}\n(KEY=${myKey})`);

        const rollIndex: number = (myNumber + yourNumber) % this.faces.length;

        console.log(
            `The fair number generation result is ${myNumber} + ${yourNumber} = ${rollIndex} (mod ${this.faces.length})`
        );

        return this.faces[rollIndex];
    }

    toString() {
        return this.faces.join(",");
    }
}
