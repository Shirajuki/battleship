import { PlayerBoard, EnemyBoard } from "./board.js";
import { Ship, BigShip, SmallShip } from "./ship.js";

class Player {
  constructor(id) {
    this.id = id;
    this.playerBoard = new PlayerBoard(10, 10);
    this.enemyBoard = new EnemyBoard(10, 10);
    this.ships = [new Ship(), new BigShip(), new SmallShip()];
    this.shots = [];
    this.placing = true;
  }
}
export default Player;
