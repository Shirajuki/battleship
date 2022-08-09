export default class Battleship {
  constructor() {
    this.playerId = "";
    this.playerBoard = [];
    this.enemyBoard = [];
    this.ships = [];
    this.shots = [];
  }

  updateBoards({ id, playerBoard, enemyBoard, ships, shots }) {
    this.playerId = id;
    this.playerBoard = playerBoard.board;
    this.enemyBoard = enemyBoard.board;
    this.ships = ships;
    this.shots = shots;
  }
}
