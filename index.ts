import Game from "./Classes/Game";
import Player from "./Classes/Player";

const player1: Player = new Player('player1');
const player2: Player = new Player('player2');
const player3: Player = new Player('player3');

const game: Game = new Game();
game.initializeGame(player1, player2, player3);
game.playGame();