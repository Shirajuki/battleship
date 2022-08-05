import Board from './board.js';
import {Ship, BigShip, SmallShip} from './Ship.js';
class Player {
	constructor(id) {
		this.id = id;
		this.board = new Board(16, 16);
		this.ships = [
			new Ship(),
			new BigShip(),
			new SmallShip()
		];
	}
}
export default Player;
