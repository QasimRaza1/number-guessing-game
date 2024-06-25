import inquirer from 'inquirer';

class NumberGuessingGame {
    private maxNumber: number;
    private totalRounds: number;
    private score: number;

    constructor(maxNumber: number = 100, totalRounds: number = 3) {
        this.maxNumber = maxNumber;
        this.totalRounds = totalRounds;
        this.score = 0;
    }

    private generateRandomNumber(): number {
        return Math.floor(Math.random() * this.maxNumber) + 1;
    }

    private async askGuess(): Promise<number> {
        const answers = await inquirer.prompt({
            name: 'guess',
            type: 'number',
            message: 'Enter your guess:',
            validate: (input) => {
                if (isNaN(input)) {
                    return 'Please enter a valid number';
                }
                return true;
            }
        });
        return answers.guess;
    }

    private async playRound(roundNumber: number): Promise<void> {
        const randomNumber = this.generateRandomNumber();
        let attempts = 0;
        let guessedCorrectly = false;

        console.log(`Round ${roundNumber} - Guess the number between 1 and ${this.maxNumber}`);

        while (!guessedCorrectly) {
            const guess = await this.askGuess();
            attempts++;

            if (guess > randomNumber) {
                console.log('Too high! Try again.');
            } else if (guess < randomNumber) {
                console.log('Too low! Try again.');
            } else {
                console.log(`Correct! You guessed the number in ${attempts} attempts.`);
                guessedCorrectly = true;
                this.score += (this.maxNumber / attempts); // Simple scoring logic
            }
        }
    }

    public async startGame(): Promise<void> {
        console.log(`Welcome to the Number Guessing Game!`);
        console.log(`You will play ${this.totalRounds} rounds.`);
        
        for (let i = 1; i <= this.totalRounds; i++) {
            await this.playRound(i);
        }

        console.log(`Game over! Your total score is: ${this.score.toFixed(2)}`);
    }
}

const game = new NumberGuessingGame();
game.startGame();
