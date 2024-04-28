import { describe, it, expect, beforeEach } from 'vitest';
import { Game } from './game';
import { Card } from './card';
import { Deck } from './deck';

describe('Game', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    it('deve iniciar um novo jogo corretamente', () => {
        expect(game.getGameState()).toBe('playerTurn');
        expect(game.getPlayerHand().length).toBe(2);
        expect(game.getDealerHand().length).toBe(2);
    });

    it('deve calcular as pontuações corretamente', () => {
        const cards = [new Card('A', 'spades'), new Card('J', 'hearts')];
        game = new Game(); 
        game['playerHand'] = cards;
        game['dealerHand'] = cards;
        game.updateScores();
        expect(game.getPlayerScore()).toBe(21);
        expect(game.getDealerScore()).toBe(21);
    });

    it('deve permitir ao jogador pegar uma carta (hit) quando for sua vez', () => {
        game['gameState'] = 'playerTurn'; 
        game.playerHit();
        expect(game.getPlayerHand().length).toBe(3);
    });

    it('deve terminar o jogo se o jogador ultrapassar 21', () => {
        game['gameState'] = 'playerTurn';
        game['playerHand'] = [new Card('10', 'hearts'), new Card('10', 'diamonds'), new Card('2', 'clubs')];
        game.updateScores();
        game.playerHit();  
        expect(game.getGameState()).toBe('gameOver');
    });

    it('deve permitir que o dealer jogue após o jogador alcançar 21 pontos', () => {
        game['gameState'] = 'dealerTurn';
        game['playerScore'] = 21; 
        game.dealerPlay();
        expect(game.getGameState()).toBe('gameOver');
    });
});
