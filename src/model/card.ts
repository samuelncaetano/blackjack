export class Card {
  constructor(public readonly face: string, public readonly suit: string) {}

  getValue(): number {
      if (this.face === 'A') return 11;
      if (['J', 'Q', 'K'].includes(this.face)) return 10;
      return parseInt(this.face);
  }
}
