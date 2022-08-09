import { PlayerBoard, EnemyBoard } from "./board.js";
import { Ship, BigShip, SmallShip } from "./ship.js";

class Player {
  constructor(id) {
    this.id = id;
    this.playerBoard = new PlayerBoard(16, 16);
    this.enemyBoard = new EnemyBoard(16, 16);
    this.ships = [new Ship(), new BigShip(), new SmallShip()];
  }
}
export default Player;
