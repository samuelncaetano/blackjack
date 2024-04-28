import { Card } from "./card";

export class Deck {
    private cards: Card[] = [];

    constructor() {
        this.initialize();
    }

    private initialize() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        for (let suit of suits) {
            for (let face of faces) {
                this.cards.push(new Card(face, suit));
            }
        }

        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw(): Card | undefined {
        return this.cards.pop();
    }
}
