class Game {
  constructor(player1, player2) {
    this.p1 = player1;
    this.p2 = player2;
    this.turn = 0;
  }

  placeShip({ shipIndex, pos, playerID }) {
    if (this.turn === 0 && playerID === this.p1.id) {
      const ship = this.p1.ships[shipIndex];
      if (ship.placed) return;
      ship.place(pos.x, pos.y);

      this.turn = 1;
    } else if (this.turn === 1 && playerID === this.p2.id) {
      const ship = this.p2.ships[shipIndex];
      if (ship.placed) return;
      ship.place(pos.x, pos.y);

      this.turn = 0;
    } else {
      // Send placement error to playerID
      return;
    }
  }

  displayBoard() {
    // Update playerboard and enemyboard
    this.p1.playerBoard.update(this.p1.ships);
    this.p1.playerBoard.draw();
    this.p1.enemyBoard.update(this.p2.ships);
    this.p1.enemyBoard.draw();

    this.p2.playerBoard.update(this.p2.ships);
    //this.p2.playerBoard.draw();
    //this.p2.enemyBoard.update(this.p1.ships);
    //this.p2.enemyBoard.draw();
  }
}
export default Game;
