export class Ship {
  constructor() {
    this.placed = false;
    this.pos = { x: -5, y: -5 };
    this.parts = [{ x: 0, y: 0, shot: false }];
  }
  place(x, y) {
    this.pos = { x: x, y: y };
    this.placed = true;
    return true;
  }
  shoot(x, y) {
    for (const part of this.parts) {
      if (
        x === this.pos.x + part.x &&
        y === this.pos.y + part.y &&
        !part.shot
      ) {
        part.shot = true;
        return true;
      }
    }
    return false;
  }
}

export class BigShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -1, y: 0, shot: false },
      { x: 0, y: 0, shot: false },
      { x: 1, y: 0, shot: false },
    ];
  }
}

export class SmallShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: 0, y: 0, shot: false },
      { x: 1, y: 0, shot: false },
    ];
  }
}
