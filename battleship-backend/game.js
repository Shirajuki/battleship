class Game {
  constructor(player1, player2) {
    this.p1 = player1;
    this.p2 = player2;
    this.turn = 0;
  }
  checkPlayerTurn(playerID) {
    return (
      (this.turn === 0 && playerID === this.p1.id) ||
      (this.turn === 1 && playerID === this.p2.id)
    );
  }
  getPlayerByTurn() {
    return this.turn === 0 ? this.p1 : this.p2;
  }
  getEnemyByTurn() {
    return this.turn === 1 ? this.p1 : this.p2;
  }

  canPlace(x, y) {
    const board = this.getPlayerByTurn().playerBoard.board;
    if (y < board.length && y >= 0 && x < board[y].length && x >= 0)
      return board[y][x] == "0";
    return false;
  }
  placeShip({ shipIndex, pos, playerId }) {
    if (!this.checkPlayerTurn(playerId)) return { error: 0 };

    const ship = this.getPlayerByTurn().ships[shipIndex];
    // Check can be placed
    if (!this.canPlace(pos.x, pos.y)) return {};
    ship?.place(pos.x, pos.y);
    this.turn = (this.turn + 1) % 2;
    return {};
  }

  canShoot(x, y) {
    const board = this.getPlayerByTurn().enemyBoard.board;
    if (y < board.length && y >= 0 && x < board[y].length && x >= 0)
      return board[y][x] == "0";
    return false;
  }
  shootShip({ pos, playerId }) {
    if (!this.checkPlayerTurn(playerId)) return { error: 0 };

    const ship = this.getEnemyByTurn().ships.find((ship) => {
      for (const part of ship.parts)
        if (pos.x === ship.pos.x + part.x && pos.y === ship.pos.y + part.y)
          return true;
    });
    // Check can be shot
    if (!this.canShoot(pos.x, pos.y)) return {};
    this.getPlayerByTurn().shots.push(pos);
    this.turn = (this.turn + 1) % 2;
    const shot = ship?.shoot(pos.x, pos.y);
    if (shot) {
      console.log(playerId, "hit", pos);
      return {};
    } else {
      console.log(playerId, "missed", pos);
      return {};
    }
  }

  checkWin() {
    const p1 = this.p1.ships.every((ship) =>
      ship.parts.every((part) => part.shot)
    );
    const p2 = this.p1.ships.every((ship) =>
      ship.parts.every((part) => part.shot)
    );

    if (p1) {
      console.log(this.p1.id);
    } else if (p2) {
      console.log(this.p2.id);
    } else {
      console.log("None");
    }
  }

  updateBoards() {
    this.p1.playerBoard.update(this.p1.ships);
    this.p1.enemyBoard.update(this.p2.ships, this.p1.shots);
    this.p2.playerBoard.update(this.p2.ships);
    this.p2.enemyBoard.update(this.p1.ships, this.p2.shots);
  }

  displayBoards() {
    this.p1.playerBoard.draw();
    this.p1.enemyBoard.draw();
    // this.p2.playerBoard.draw();
    // this.p2.enemyBoard.draw();
  }
}
export default Game;
