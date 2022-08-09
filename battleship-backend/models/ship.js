export class Ship {
  constructor() {
    this.placed = false;
    this.parts = [{ x: 0, y: 0, shot: false }];
  }
  place(x, y) {
    this.pos = { x: x, y: y };
    this.placed = true;
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
