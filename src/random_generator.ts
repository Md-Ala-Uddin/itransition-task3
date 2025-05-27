import crypto from 'node:crypto';

export class RandomGenerator {
    static generateKey() {
        return crypto.randomBytes(32).toString('hex');
    }

    static secureRandomInt(min: number, max: number) {
        const range = max - min + 1;
        const bytesNeeded = Math.ceil(Math.log2(range) / 8);
        const maxValue = 2 ** (bytesNeeded * 8);
        const cutOff = maxValue - (maxValue % range);

        let rand;
        do {
            rand = parseInt(crypto.randomBytes(bytesNeeded).toString('hex'), 16);
        } while( rand >= cutOff );

        return min + ( rand % range );
    }
}