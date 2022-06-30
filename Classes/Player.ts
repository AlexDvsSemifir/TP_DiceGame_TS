import Gobelet from "./Gobelet";

export default class Player {
    private _name: string;
    private _score: number = 0;
    private _gameScore: number = 0;

    constructor(name: string) {
        this._name = name;
    }

    get score() {
        return this._score;
    }
    
    get gameScore() {
        return this._gameScore;
    }

    public updateGameScore() {
        this._gameScore += 1;
        this._score = 0;
    }
    
    get name () {
        return this._name;
    }

    rollGobelet(gobelet: Gobelet) {
        gobelet.rollGobelet();
        console.log(gobelet.values)
        this._score = gobelet.value;
    }
}