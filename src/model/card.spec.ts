import { describe, it, expect } from 'vitest';
import { Card } from './card';

describe('Card', () => {
  it('deve retornar 11 para um ás', () => {
    const card = new Card('A', 'hearts');
    expect(card.getValue()).toBe(11);
  });

  it('deve retornar 10 para figuras (J, Q, K)', () => {
    const jack = new Card('J', 'spades');
    const queen = new Card('Q', 'diamonds');
    const king = new Card('K', 'clubs');
    expect(jack.getValue()).toBe(10);
    expect(queen.getValue()).toBe(10);
    expect(king.getValue()).toBe(10);
  });

  it('deve retornar o valor numérico para cartas numéricas', () => {
    const two = new Card('2', 'hearts');
    const nine = new Card('9', 'clubs');
    expect(two.getValue()).toBe(2);
    expect(nine.getValue()).toBe(9);
  });
});
