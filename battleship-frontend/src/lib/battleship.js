import { gameState } from "./constants";

export default class Battleship {
  constructor(room) {
    this.room = room;
    this.playerId = "";
    this.playerBoard = [];
    this.enemyBoard = [];
    this.ships = [];
    this.shots = [];
    this.playerTurn = true;
    this.state = gameState.place;
  }

  updateBoards({ id, playerBoard, enemyBoard, ships, shots, turn, state }) {
    // Update game status
    this.playerId = id;
    this.playerBoard = playerBoard.board;
    this.enemyBoard = enemyBoard.board;
    this.ships = ships;
    this.shots = shots;
    this.playerTurn = turn; // Update player turn
    this.state = state; // Update game state/phase
  }

  getShipIndex(x, y) {
    return this.ships.findIndex((ship) =>
      ship.parts.some(
        (part) => x === ship.pos.x + part.x && y === ship.pos.y + part.y
      )
    );
  }
}
