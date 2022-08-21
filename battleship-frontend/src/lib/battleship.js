import { gameState } from "./constants";

export default class Battleship {
  constructor(room) {
    this.room = room;
    this.init();
  }

  init() {
    this.playerId = "";
    this.playerBoard = [];
    this.enemyBoard = [];
    this.ships = [];
    this.shots = [];
    this.playerTurn = true;
    this.state = gameState.place;
    this.player = "";
    this.placed = false;
    this.sunkenShips = [];
  }

  updateGame({
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
    this.player = player;
    this.playerBoard = playerBoard.board;
    this.enemyBoard = enemyBoard.board;
    this.ships = ships;
    this.shots = shots;
    this.playerTurn = turn; // Update player turn
    this.state = state; // Update game state/phase
  }

  shipSunk(ships) {
    this.sunkenShips = ships;
  }

  getSunkenShip(x, y) {
    const shipIndex = this.sunkenShips
      .map((ship) => {
        // Hide non correct player sunken ships
        if (ship.player !== this.player) ship.pos = { x: 100, y: 100 };
        return ship;
      })
      .findIndex((ship) =>
        ship.parts.some(
          (part) => x === ship.pos.x + part.x && y === ship.pos.y + part.y
        )
      );

    if (shipIndex === -1) return null;
    const ship = this.sunkenShips[shipIndex];
    const shipPart = ship.parts.find(
      (part) => x === ship.pos.x + part.x && y === ship.pos.y + part.y
    );
    return { index: shipIndex, part: shipPart };
  }

  getShip(x, y) {
    const shipIndex = this.ships.findIndex((ship) =>
      ship.parts.some(
        (part) => x === ship.pos.x + part.x && y === ship.pos.y + part.y
      )
    );
    if (shipIndex === -1) return null;
    const ship = this.ships[shipIndex];
    const shipPart = ship.parts.find(
      (part) => x === ship.pos.x + part.x && y === ship.pos.y + part.y
    );
    return { index: shipIndex, part: shipPart };
  }
}
