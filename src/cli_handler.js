import readline from "readline";
import { TableRenderer } from "./table_renderer.js";

export class CliHandler {
    static activeReadlines = 0; // Static counter for active readline instances

    constructor(diceArray) {
        this.diceArray = diceArray;
        this.allOptions = {};
        this.counter = 0;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    async prompt(question) {
        let ans = -1;
        while (true) {
            ans = await new Promise((resolve) => {
                this.rl.question(question, (answer) => {
                    resolve(answer);
                });
            });

            if (!Object.keys(this.allOptions).includes(ans)) {
                if (this.counter === 3) {
                    this.counter = 0;
                    console.log(
                        "You entered wrong choices more than three times, exiting..."
                    );
                    process.exit(0);
                }

                console.log(`Invalid choice, enter correct choice: `);
                this.counter++;
                continue;
            }

            if (ans === "x") {
                console.log("exiting...");
                this.rl.close();
                process.exit(0);
            } else if (ans === "?") {
                this.showHelp();
                continue;
            } else {
                break;
            }
        }

        return ans;
    }

    async askForChoice(question, options) {
        this.allOptions = {
            ...options,
            x: "exit",
            "?": "help",
        };

        const q = this.prepareQuestion(question, this.allOptions);
        const input = await this.prompt(q);
        return input;
    }

    prepareQuestion(question, options) {
        const optionString = Object.entries(options)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");
        return `${question}\n${optionString}\n`;
    }

    showHelp() {
        TableRenderer.render(this.diceArray);
    }
}
