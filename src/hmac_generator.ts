import * as crypto from 'crypto';

export class HMACGenerator {
    static generateHMAC(key: string, message: string): string {
        return crypto.createHmac("sha3-256", key).update(message).digest("hex");
    }
}
