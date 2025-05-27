import { CliHandler } from "./cli_handler.js";
import { RandomGenerator } from "./random_generator.js";
import { HMACGenerator } from "./hmac_generator.js";

export class FairRandomProtocol {
    // needs change 
    static async decideFirstMove(cli: CliHandler): Promise<string> {
        console.log("Let's determine who makes the first move.");
        const computerNumber = Number(RandomGenerator.secureRandomInt(0, 1));
        const key = RandomGenerator.generateKey();
        const hmac = HMACGenerator.generateHMAC(key, computerNumber.toString());

        console.log(`I selected a random value in the range 0..1\n(HMAC=${ hmac }).`);
        const userNumber = Number(await cli.askForChoice('Try to guess my selection', {"0": '0', "1": '1'}));

        console.log(`Your selection: ${ userNumber }`);
        console.log(`My selection: ${ computerNumber } (KEY=${ key })`);

        return userNumber != computerNumber ? 'I' : 'You';
    }
}
