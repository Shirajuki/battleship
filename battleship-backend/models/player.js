import { PlayerBoard, EnemyBoard } from "./board.js";
import {
  TwoShipEnded,
  ThreeShipEnded,
  BigLShip,
  LargeLShip,
  ThreeShip,
  TShip,
  BigZShip,
  LShip,
  BigLShipMirror,
  LargeTShip,
  ZShip,
  FiveShip,
  FourShipEnded,
  FourShip,
} from "./ship.js";

const getRandomBuild = () => {
  const rnd = Math.floor(Math.random() * 6);
  switch (rnd) {
    case 0:
      return [
        new TwoShipEnded(),
        new TwoShipEnded(),
        new ThreeShipEnded(),
        new BigLShip(),
        new LargeLShip(),
      ];
    case 1:
      return [
        new TwoShipEnded(),
        new TwoShipEnded(),
        new ThreeShip(),
        new TShip(),
        new BigZShip(),
      ];
    case 2:
      return [
        new TwoShipEnded(),
        new TwoShipEnded(),
        new LShip(),
        new BigLShipMirror(),
        new LargeTShip(),
      ];
    case 3:
      return [
        new TwoShipEnded(),
        new TwoShipEnded(),
        new LShip(),
        new ZShip(),
        new FiveShip(),
      ];
    case 4:
      return [
        new TwoShipEnded(),
        new ThreeShipEnded(),
        new ThreeShip(),
        new FourShipEnded(),
        new FiveShip(),
      ];
    default:
      return [
        new TwoShipEnded(),
        new TwoShipEnded(),
        new LShip(),
        new FourShip(),
        new LargeTShip(),
      ];
  }
};

class Player {
  constructor(id) {
    this.id = id;
    this.playerBoard = new PlayerBoard(10, 10);
    this.enemyBoard = new EnemyBoard(10, 10);
    this.ships = getRandomBuild();
    this.shots = [];
    this.placing = true;
  }
  canEndPlace() {
    return this.ships.every((ship) => ship.placed);
  }
}
export default Player;
