export class Flammability {
    readonly p: number
    constructor(p: number) {
        if (p < 0 || p > 1) {
            throw new Error('Flammability out of range (should be between 0 and 1')
        }
        this.p = p
    }
}