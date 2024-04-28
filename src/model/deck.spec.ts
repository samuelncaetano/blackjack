// Deck.test.ts
import { describe, it, expect, beforeAll } from 'vitest';
import { Deck } from './deck';
import { Card } from './card';

describe('Deck', () => {
  let deck: Deck;
  
  beforeAll(() => {
    deck = new Deck();
  });

  it('deve conter 52 cartas após a inicialização', () => {
    expect(deck['cards'].length).toBe(52);
  });

  it('deve conter 52 cartas únicas', () => {
    const uniqueCards = new Set(deck['cards'].map(card => `${card.face} of ${card.suit}`));
    expect(uniqueCards.size).toBe(52);
  });

  it('deve mudar a ordem das cartas após o embaralhamento', () => {
    const initialOrder = [...deck['cards']];
    deck.shuffle();
    const newOrder = [...deck['cards']];
    const isSameOrder = initialOrder.every((card, index) => card === newOrder[index]);
    expect(isSameOrder).toBe(false);
  });

  it('deve diminuir o número de cartas no baralho quando uma carta é retirada', () => {
    const initialCount = deck['cards'].length;
    deck.draw();
    expect(deck['cards'].length).toBe(initialCount - 1);
  });

  it('deve retornar uma carta quando a função draw é chamada', () => {
    const card = deck.draw();
    expect(card).toBeInstanceOf(Card);
  });
  
  it('deve retornar undefined quando todas as cartas forem retiradas', () => {
    // Esvaziar o baralho
    while (deck.draw() !== undefined) { }
    expect(deck.draw()).toBeUndefined();
  });
});
