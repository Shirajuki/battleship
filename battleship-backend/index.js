import Game from "./game.js";
import Player from "./models/player.js";

console.log("Hello World!");

const p1 = new Player("p1");
const p2 = new Player("p2");
const game = new Game(p1, p2);
game.placeShip({ shipIndex: 1, pos: { x: 5, y: 5 }, playerID: "p1" });
game.placeShip({ shipIndex: 1, pos: { x: 5, y: 2 }, playerID: "p2" });
game.displayBoard();
