import Dice from "./Dice";
import Gobelet from "./Gobelet";
import Player from "./Player";

export default class Game {
  private _numberOfTurns!: number;
  private _players: Player[] = [];
  private _gobelet!: Gobelet;

  /**
   * Add all ne needed players to the game
   * @param players
   */
  private addPlayers(...players: Player[]) {
    players.forEach((player) => this._players.push(player));
  }

  /**
   * Set the number of turns to play
   */
  private setTurns() {
    this._numberOfTurns = this._players.length + 1;
  }

  /**
   * Create the dices needed for the game
   */
  private createDices() {
    this._gobelet = new Gobelet();
    for (let i = 0; i < this._players.length; i++) {
      this._gobelet.addDice(new Dice());
    }
  }

  /**
   * Create the game
   * @param players
   */
  public initializeGame(...players: Player[]) {
    this.addPlayers(...players);
    this.setTurns();
    this.createDices();
  }

  /**
   * Play a single turn of the game
   */
  private startTurn() {
    this._players.forEach((player) => {
      player.rollGobelet(this._gobelet);
    });
  }

  /**
   * Get the winenr of the turn
   * @returns {Player}: The player who won the turn
   */
  private getTurnWinner(): Player {
    let winner: Player = this._players[0];
    this._players.forEach((player) => {
      if (player.score > winner.score) {
        winner = player;
      } else if (player.score === winner.score && player.name !== winner.name) {
        winner = this.reroll(winner, player);
        this.getTurnWinner();
      }
    });
    return winner;
  }

  private reroll(player1: Player, player2: Player) {
    console.log(`Relance entre ${player1.name} et ${player2.name} :\r\n`);
    player1.rollGobelet(this._gobelet);
    console.log(`${player1.name} a fait ${player1.score}`);
    player2.rollGobelet(this._gobelet);
    console.log(`${player2.name} a fait ${player2.score}`);
    return player1.score > player2.score ? player1 : player2;
  }

  private showTurnWinner(winner: Player) {
    console.log(`\r\nLe vainqueur du tour est ${winner.name} \r\n`);
  }

  /**
   * Update the game score of the turn's winner
   */
  private updateTurnWinnerScore() {
    let winner: Player = this.getTurnWinner();
    this.showTurnWinner(winner);
    winner.updateGameScore();
  }

  /**
   * Show all the game's scores
   */
  private showAllGameScore() {
    this._players.forEach((player) => {
      console.log(`${player.name} a gagné ${player.gameScore} parties\r\n`);
    });
  }

  private showTurnScore() {
    this._players.forEach((player) => {
      console.log(`${player.name} a fait ${player.score}`);
    });
  }

  /**
   * Show the winner of the game
   */
  private getHighestGameScore() {
    let winner: Player = this._players[0];
    this._players.forEach((player) => {
      if (player.gameScore > winner.gameScore) {
        winner = player;
        console.log(`\r\nLe vainqueur est ${winner.name}`);
      }
    });
  }

  /**
   * Start the game
   */
  public playGame() {
    for (let i = 0; i < this._numberOfTurns; i++) {
      this.startTurn();
      this.showTurnScore();
      this.updateTurnWinnerScore();
    }
    this.showAllGameScore();
    this.getHighestGameScore();
  }
}
