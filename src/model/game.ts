import { Deck } from "./deck";
import { Card } from "./card";

export class Game {
    private deck: Deck = new Deck();
    private playerHand: Card[] = [];
    private dealerHand: Card[] = [];
    private playerScore: number = 0;
    private dealerScore: number = 0;
    private gameState: string = "waiting"; // Possible states: waiting, playerTurn, dealerTurn, gameOver

    constructor() {
        this.startNewGame();  // Starts a new game immediately upon instantiation
    }

    startNewGame() {
        this.deck = new Deck();  // Recreate the deck for a new game
        this.playerHand = [this.deck.draw(), this.deck.draw()].filter(card => card !== undefined) as Card[];
        this.dealerHand = [this.deck.draw(), this.deck.draw()].filter(card => card !== undefined) as Card[];
        this.gameState = "playerTurn";
        this.updateScores();
    }

    restartGame() {
        if (this.gameState === "gameOver") {
            this.startNewGame();  // Reset the game only if it's over
        } else {
            console.log("Game is not over yet!");
        }
    }

    getPlayerHand() {
        return this.playerHand;
    }

    getDealerHand() {
        return this.dealerHand;
    }

    getPlayerScore() {
        return this.playerScore;
    }

    getDealerScore() {
        return this.dealerScore;
    }

    updateScores() {
        this.playerScore = this.calculateScore(this.playerHand);
        this.dealerScore = this.calculateScore(this.dealerHand);
    }

    calculateScore(hand: Card[]) {
        let score = hand.reduce((acc, card) => acc + card.getValue(), 0);
        let aceCount = hand.filter(card => card.face === 'A').length;
        while (score > 21 && aceCount > 0) {
            score -= 10;  // Adjusts the value of Ace from 11 to 1
            aceCount--;
        }
        return score;
    }

    playerHit() {
        if (this.gameState !== "playerTurn") return;
        const newCard = this.deck.draw();
        if (newCard) {
            this.playerHand.push(newCard);
            this.updateScores();
            // Verifica se o jogador ultrapassou 21 e termina o jogo se sim
            if (this.playerScore > 21) {
                this.gameState = "gameOver";  // Muda o estado para gameOver
            } else if (this.playerScore === 21) {
                this.gameState = "dealerTurn";  // Se atingir exatamente 21, passa a vez para o dealer
            }
        }
    }
    

    dealerPlay() {
        while (this.dealerScore < 17) {
            const newCard = this.deck.draw();
            if (newCard) {
                this.dealerHand.push(newCard);
                this.updateScores();
            } else {
                break;  // Break if no cards are left to draw
            }
        }
        this.gameState = "gameOver";
    }

    getGameState() {
        return this.gameState;
    }
}
