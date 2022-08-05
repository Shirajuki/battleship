import Player from "./models/player.js";
class Game {
	constructor(player1Id, player2Id) {
		this.player1 = new Player(player1Id);
		this.player2 = new Player(player2Id);
	}
}
export default Game;
