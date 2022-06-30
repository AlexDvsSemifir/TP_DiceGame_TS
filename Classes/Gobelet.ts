import Dice from "./Dice";

export default class Gobelet {
    private _value: number = 0;
    private _dices: Dice[] = [];

    
    public get values() {
        return this._dices.map(dice => dice.value);
    }
    
    public get value() {
        return this._value;
    }
    
    /**
     * Roll the content of the gobelet
     */
    public rollGobelet() {
        this._value = 0;
        this._dices.forEach(dice => {
            this._value += dice.roll();
        });
    }

    /**
     * Add a single dice to the gobelet
     * @param dice 
     */
    public addDice(dice: Dice) {
        this._dices.push(dice);
    }
}