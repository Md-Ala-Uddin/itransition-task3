import readline from "readline";
import { TableRenderer } from "./table_renderer.js";
import { Dice } from "./dice.js";

export class CliHandler {
    diceArray: Dice[];
    allOptions: Record<string, string>;
    counter: number;
    rl: readline.Interface;
    static activeReadlines = new Set<readline.Interface>();

    constructor(diceArray: Dice[]) {
        this.diceArray = diceArray;
        this.allOptions = {};
        this.counter = 0;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        CliHandler.activeReadlines.add(this.rl);
    }

    async prompt(question: string): Promise<string> {
        let ans = '';
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
                    this.closeReadline();
                    CliHandler.closeAllReadlines();
                    process.exit(0);
                }

                console.log(`Invalid choice, enter correct choice: `);
                this.counter++;
                continue;
            }

            if (ans === "x") {
                console.log("exiting...");
                this.closeReadline();
                CliHandler.closeAllReadlines();
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

    async askForChoice(question: string, options: Record<string, string>): Promise<string> {
        this.allOptions = {
            ...options,
            x: "exit",
            "?": "help",
        };

        const q = this.prepareQuestion(question, this.allOptions);
        const input = await this.prompt(q);
        return input;
    }

    prepareQuestion(question: string, options: Record<string, string>): string {
        const optionString = Object.entries(options)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");
        return `${question}\n${optionString}\n`;
    }

    showHelp(): void {
        TableRenderer.render(this.diceArray);
    }

    static closeAllReadlines(): void {
        CliHandler.activeReadlines.forEach((rl) => rl.close());
        CliHandler.activeReadlines.clear();
    }

    closeReadline(): void {
        if (this.rl) {
            this.rl.close();
            CliHandler.activeReadlines.delete(this.rl);
        }
    }
}
