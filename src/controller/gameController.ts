import { Game } from "../model/game";
import { GameView } from "../view/gameView";
import * as readline from 'readline';

export class GameController {
    private game: Game = new Game();
    private view: GameView = new GameView(this.game);
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    constructor() {
        this.startGame();
    }

    startGame() {
        this.game.startNewGame();
        this.view.displayGame();
        this.processPlayerTurn();
    }

    processPlayerTurn() {
        if (this.game.getGameState() === "gameOver") {
            this.view.displayGameOver();
            this.offerRestartOption();
        } else {
            this.view.displayPlayerOptions();
            this.rl.question('Choose an option (h = hit, s = stand, q = quit): ', (answer) => {
                switch (answer.toLowerCase()) {
                    case 'h':
                        this.game.playerHit();
                        this.view.displayGame();
                        this.processPlayerTurn();
                        break;
                    case 's':
                        this.game.dealerPlay();
                        this.view.displayGame();
                        this.processPlayerTurn();
                        break;
                    case "q":
                        console.log("Thank you for playing!");
                        this.rl.close();
                        break;
                    default:
                        console.log("Invalid option.");
                        this.processPlayerTurn();
                        break;
                    }
                });
            }
        }
        
        offerRestartOption() {
            this.rl.question('Do you want to play again? (y/n): ', (answer) => {
                switch (answer.toLowerCase()) {
                    case "y":
                        this.game.restartGame();
                        this.view.displayGame();
                        this.processPlayerTurn();
                        break;
                    case "n":
                        console.log("Thank you for playing!");
                        this.rl.close();
                        break;
                    default:
                        console.log("Invalid option.");
                        this.offerRestartOption();
                        break;
            }
        });
    }
}

new GameController();
