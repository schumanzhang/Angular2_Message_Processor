import { Message } from './message';

export class BirthdayMessage extends Message {

    _standardMessage: string;
    _selectedGift: string;

    constructor(messageType: string, name: string) {
        super(messageType, name);
    }

    get standardMessage(): string {
        return this._standardMessage;
    }

    set standardMessage(standardMessage: string) {
        this.standardMessage = standardMessage;
    }

    get selectedGift(): string {
        return this._selectedGift;
    }

    set selectedGift(selectedGift: string) {
        this._selectedGift = selectedGift;
    }

    renderStandardMessage(selectedGift: string) {
        this._selectedGift = selectedGift;
        this._standardMessage = 'Mate, Happy Birthday. To celebrate this once a year occasion we have picked the following gift: ' + this._selectedGift + '. Enjoy!';
    }

}
