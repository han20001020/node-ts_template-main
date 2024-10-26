export class Rational {
    private numerator: number;
    private denominator: number;

    constructor(numerator: number, denominator: number) {
        if (denominator === 0) {
            throw new Error("Denominator cannot be zero");
        }
        this.numerator = numerator;
        this.denominator = denominator;
    }

    
    normalize(): Rational {
        const gcd = this.greatestCommonDivisor(this.numerator, this.denominator);
        return new Rational(this.numerator / gcd, this.denominator / gcd);
    }

  
    private greatestCommonDivisor(a: number, b: number): number {
        return b === 0 ? a : this.greatestCommonDivisor(b, a % b);
    }

    
    toString(): string {
        return `${this.numerator}/${this.denominator}`;
    }

   
    equals(other: Rational): boolean {
        const normalizedThis = this.normalize();
        const normalizedOther = other.normalize();
        return (
            normalizedThis.numerator === normalizedOther.numerator &&
            normalizedThis.denominator === normalizedOther.denominator
        );
    }

   
    isWhole(): boolean {
        return this.normalize().denominator === 1;
    }

    
    isDecimal(): boolean {
        return !this.isWhole();
    }

    
    static parseRational(input: string): Rational {
        const parts = input.split("/");
    
        if (parts.length !== 2) {
            throw new Error(`Invalid input: ${input}. Expected format "numerator/denominator".`);
        }
    
        
        const num = Number(parts[0]);
        const denom = Number(parts[1]);
    
        if (isNaN(num) || isNaN(denom)) {
            throw new Error(`Invalid number in input: ${input}`);
        }
    
        return new Rational(num, denom);
    }
    
    
    static _parseRational(numerators: string[], denominators: string[]): Rational {
     
        const numerator = Number(numerators.join(''));
        const denominator = Number(denominators.join(''));
    
        if (isNaN(numerator) || isNaN(denominator)) {
            throw new Error("Invalid input: All elements must be valid numbers.");
        }
    
        return new Rational(numerator, denominator);
    }
}