export class Ship {
	constructor(x, y) {
		this.pos = {x: x, y: y};
	}
}
export class BigShip extends Ship {
	constructor(x, y) {
		super(x, y);
	}
}
export class SmallShip extends Ship {
	constructor(x, y) {
		super(x, y);
	}
}
