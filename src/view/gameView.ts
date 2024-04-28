import { Game } from "../model/game";

export class GameView {
    constructor(private game: Game) {}

    displayGame() {
        console.clear();
        console.log("Player Hand:", this.game.getPlayerHand().map(card => `${card.face} of ${card.suit}`));
        console.log("Player Score:", this.game.getPlayerScore());
        console.log("Dealer Hand:", this.game.getDealerHand().map(card => `${card.face} of ${card.suit}`));
        console.log("Dealer Score:", this.game.getDealerScore());
    }

    displayPlayerOptions() {
        if (this.game.getGameState() === "playerTurn") {
            console.log("Options: [h] Hit, [s] Stand");
        }
    }

    displayGameOver() {
        if (this.game.getGameState() === "gameOver") {
            console.log("Game Over.");
            if (this.game.getPlayerScore() > 21) {
                console.log("Player busts! Dealer wins.");
            } else if (this.game.getDealerScore() > 21) {
                console.log("Dealer busts! Player wins.");
            } else if (this.game.getPlayerScore() > this.game.getDealerScore()) {
                console.log("Player wins!");
            } else if (this.game.getPlayerScore() < this.game.getDealerScore()) {
                console.log("Dealer wins!");
            } else {
                console.log("It's a tie!");
            }
        }
    }
}
