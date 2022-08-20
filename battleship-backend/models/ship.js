export class Ship {
  constructor() {
    this.placed = false;
    this.pos = { x: -5, y: -5 };
    this.parts = [{ x: 0, y: 0, shot: false, sprite: { x: 0, y: 0 } }];
  }
  checkSunk() {
    return this.parts.every((part) => part.shot);
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

// -=
export class TwoShipEnded extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -1, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: 0, y: 0, shot: false, sprite: { x: 0, y: 1 } },
    ];
  }
}
// -==
export class ThreeShipEnded extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -1, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: 0, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 1, y: 0, shot: false, sprite: { x: 0, y: 1 } },
    ];
  }
}
// -=-
export class ThreeShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -1, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: 0, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 1, y: 0, shot: false, sprite: { x: 1, y: 1 } },
    ];
  }
}
//  l
// -+
export class LShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -1, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: 0, y: 0, shot: false, sprite: { x: 2, y: 3 } },
      { x: 0, y: -1, shot: false, sprite: { x: 0, y: 3 } },
    ];
  }
}
// -===
export class FourShipEnded extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -1, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: 0, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 1, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 2, y: 0, shot: false, sprite: { x: 0, y: 1 } },
    ];
  }
}
// -==-
export class FourShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -1, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: 0, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 1, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 2, y: 0, shot: false, sprite: { x: 1, y: 1 } },
    ];
  }
}
// -=+
//   l
export class BigLShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -2, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: -1, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 0, y: 0, shot: false, sprite: { x: 7, y: 0 } },
      { x: 0, y: -1, shot: false, sprite: { x: 5, y: 1 } },
    ];
  }
}
//  l
// -+-
export class TShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -1, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: 0, y: 0, shot: false, sprite: { x: 4, y: 2 } },
      { x: 1, y: 0, shot: false, sprite: { x: 1, y: 1 } },
      { x: 0, y: -1, shot: false, sprite: { x: 5, y: 1 } },
    ];
  }
}
//  l
// -+-
export class BigLShipMirror extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -2, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: -1, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 0, y: 0, shot: false, sprite: { x: 6, y: 1 } },
      { x: 0, y: 1, shot: false, sprite: { x: 5, y: 0 } },
    ];
  }
}
// -+
//  +-
export class ZShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -1, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: 0, y: 0, shot: false, sprite: { x: 6, y: 1 } },
      { x: 0, y: 1, shot: false, sprite: { x: 6, y: 0 } },
      { x: 1, y: 1, shot: false, sprite: { x: 1, y: 1 } },
    ];
  }
}
// -===-
export class FiveShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -2, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: -1, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 0, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 1, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 2, y: 0, shot: false, sprite: { x: 1, y: 1 } },
    ];
  }
}
// l
// +=-
// l
export class BigTShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -1, y: 1, shot: false, sprite: { x: 0, y: 3 } },
      { x: -1, y: -1, shot: false, sprite: { x: 1, y: 2 } },
      { x: -1, y: 0, shot: false, sprite: { x: 8, y: 3 } },
      { x: 0, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 1, y: 0, shot: false, sprite: { x: 1, y: 1 } },
    ];
  }
}
// -==+
//    l
export class LargeLShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -3, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: -2, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: -1, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 0, y: 0, shot: false, sprite: { x: 6, y: 1 } },
      { x: 0, y: 1, shot: false, sprite: { x: 5, y: 0 } },
    ];
  }
}
// -+
//  +=-
export class BigZShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -1, y: -1, shot: false, sprite: { x: 1, y: 0 } },
      { x: 0, y: -1, shot: false, sprite: { x: 6, y: 1 } },
      { x: 0, y: 0, shot: false, sprite: { x: 6, y: 0 } },
      { x: 1, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 2, y: 0, shot: false, sprite: { x: 1, y: 1 } },
    ];
  }
}
//  l
// -+=-
export class LargeTShip extends Ship {
  constructor() {
    super();
    this.parts = [
      { x: -1, y: 0, shot: false, sprite: { x: 1, y: 0 } },
      { x: 0, y: -1, shot: false, sprite: { x: 5, y: 1 } },
      { x: 0, y: 0, shot: false, sprite: { x: 4, y: 2 } },
      { x: 1, y: 0, shot: false, sprite: { x: 3, y: 0 } },
      { x: 2, y: 0, shot: false, sprite: { x: 0, y: 1 } },
    ];
  }
}
