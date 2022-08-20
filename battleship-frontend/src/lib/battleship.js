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
    this.player = "";
  }

  updateBoards({
    id,
    playerBoard,
    enemyBoard,
    ships,
    shots,
    turn,
    state,
    player,
  }) {
    // Update game status
    this.playerId = id;
    this.playerBoard = playerBoard.board;
    this.enemyBoard = enemyBoard.board;
    this.ships = ships;
    this.shots = shots;
    this.playerTurn = turn; // Update player turn
    this.state = state; // Update game state/phase
    this.player = player;
  }

  getShip(x, y) {
    const shipIndex = this.ships.findIndex((ship) =>
      ship.parts.some(
        (part) => x === ship.pos.x + part.x && y === ship.pos.y + part.y
      )
    );
    const ship = this.ships[shipIndex];
    const shipPart = ship.parts.find(
      (part) => x === ship.pos.x + part.x && y === ship.pos.y + part.y
    );
    return { index: shipIndex, part: shipPart };
  }
}
