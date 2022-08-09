/*
0 - sea
1 - boat
2 - miss
3 - hit
*/
class Board {
  constructor(width, height) {
    this.board = new Array(height);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(width).fill(0);
    }
  }
  update(ships) {
    for (const ship of ships) {
      if (!ship.placed) continue;
      for (const part of ship.parts) {
        this.board[ship.pos.y + part.y][ship.pos.x + part.x] = 1;
      }
    }
  }
  draw() {
    console.log();
    this.board.forEach((row) => {
      console.log(row.join(" "));
    });
  }
}

export class PlayerBoard extends Board {
  constructor(width, height) {
    super(width, height);
  }
}

export class EnemyBoard extends Board {
  constructor(width, height) {
    super(width, height);
  }
  update(ships, shots) {
    // Update board with shots
    for (const shot of shots) {
      this.board[shot.y][shot.x] = 2;
    }
    // Update board with ships
    for (const ship of ships) {
      if (!ship.placed) continue;
      for (const part of ship.parts) {
        if (part.shot) this.board[ship.pos.y + part.y][ship.pos.x + part.x] = 3;
      }
    }
  }
}
