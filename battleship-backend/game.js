const phase = {
  place: 0,
  shoot: 1,
  end: 2,
};
class Game {
  constructor(player1, player2) {
    this.p1 = player1;
    this.p2 = player2;
    this.turn = 0;
    this.phase = phase.place;
    this.sunkenShips = [];
  }
  checkPlayerTurn(playerID) {
    if (this.phase == phase.end) return false;
    return (
      (this.turn === 0 && playerID === this.p1.id) ||
      (this.turn === 1 && playerID === this.p2.id)
    );
  }
  getPlayerById(playerId) {
    return this.p1.id === playerId ? this.p1 : this.p2;
  }
  getPlayerByTurn() {
    return this.turn === 0 ? this.p1 : this.p2;
  }
  getEnemyByTurn() {
    return this.turn === 1 ? this.p1 : this.p2;
  }

  canPlace(ship, playerId, x, y) {
    const board = this.getPlayerById(playerId).playerBoard.board;
    if (this.phase !== phase.place) return false;
    // Return false on ship parts wrong input
    if (!ship?.parts) return false;
    // Check every part of ship is in board
    if (
      !ship?.parts.every(
        (part) =>
          y + part.y < board.length &&
          y + part.y >= 0 &&
          x + part.x < board[y + part.y]?.length &&
          x + part.x >= 0
      )
    )
      return false;

    // Check ship parts with all other ships
    // Get all other placed ships
    const placedShips = this.getPlayerById(playerId).ships.filter(
      (s) => s.placed && s != ship
    );
    // Loop through player ships with current
    const shipPlacements = !placedShips.some((sh) =>
      sh.parts.some((p) =>
        ship.parts.some(
          (part) =>
            x + part.x === sh.pos.x + p.x && y + part.y === sh.pos.y + p.y
        )
      )
    );
    return shipPlacements;
  }
  placeShip({ shipIndex, pos, playerId }) {
    if (this.phase !== phase.place) return { status: 0 };

    const ship = this.getPlayerById(playerId).ships[shipIndex];
    // Check can be placed
    if (!this.canPlace(ship, playerId, pos.x, pos.y)) return { status: 0 };
    ship?.place(pos.x, pos.y);
    return { status: 1 };
  }
  endPlace({ playerId }) {
    const player = this.getPlayerById(playerId);
    if (this.phase !== phase.place || !player.placing) return { status: 0 };

    // Can end ship placement
    if (!player.canEndPlace()) return { status: 0 };
    // Update player placing status
    player.placing = false;

    // Update phase if both players has finished their ship placements
    if (!this.p1.placing && !this.p2.placing) this.phase = phase.shoot;
    return { status: 1 };
  }

  canShoot(x, y) {
    const board = this.getPlayerByTurn().enemyBoard.board;
    if (y < board.length && y >= 0 && x < board[y].length && x >= 0)
      return board[y][x] == "0";
    return false;
  }
  shootShip({ pos, playerId }) {
    if (!this.checkPlayerTurn(playerId)) return { status: 0 };

    const ship = this.getEnemyByTurn().ships.find((ship) => {
      for (const part of ship.parts)
        if (pos.x === ship.pos.x + part.x && pos.y === ship.pos.y + part.y)
          return true;
    });
    // Check can be shot
    if (!this.canShoot(pos.x, pos.y)) return { status: 0 };
    this.getPlayerByTurn().shots.push(pos);
    this.turn = (this.turn + 1) % 2;
    const shot = ship?.shoot(pos.x, pos.y);
    if (shot) {
      // Update turn back if hit
      this.turn = (this.turn + 1) % 2;
      // Return status sunk or only hit
      // sunk = 3, hit = 2, miss = 1
      if (ship.checkSunk()) {
        this.sunkenShips.push({
          ...ship,
          player: this.getPlayerByTurn().player,
        });
        return {
          status: 3,
        };
      }
      return { status: 2 };
    } else {
      return { status: 1 };
    }
  }

  checkWin() {
    const p1 = this.p1.ships.every((ship) =>
      ship.parts.every((part) => part.shot)
    );
    const p2 = this.p2.ships.every((ship) =>
      ship.parts.every((part) => part.shot)
    );

    if (p1) {
      this.phase = phase.end;
      return { player: this.p2.id };
    } else if (p2) {
      this.phase = phase.end;
      return { player: this.p1.id };
    }
  }

  updateBoards() {
    this.p1.playerBoard.update(this.p1.ships, this.p2.shots);
    this.p1.enemyBoard.update(this.p2.ships, this.p1.shots);
    this.p2.playerBoard.update(this.p2.ships, this.p1.shots);
    this.p2.enemyBoard.update(this.p1.ships, this.p2.shots);
  }
}
export default Game;
