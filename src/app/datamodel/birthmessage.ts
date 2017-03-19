import { Message } from './message';

export class BirthMessage extends Message {

    _standardMessage: string;
    _childName: string;
    _formattedDob: string;

    constructor(messageType: string, name: string) {
        super(messageType, name);
    }

    get childName(): string {
        return this._childName;
    }

    set childName(childName: string) {
        this._childName = childName;
    }

    get standardMessage(): string {
        return this._standardMessage;
    }

    set standardMessage(standardMessage: string) {
        this.standardMessage = standardMessage;
    }

    get formattedDob(): string {
        return this._formattedDob;
    }

    set formattedDob(formattedDob: string) {
        this._formattedDob = formattedDob;
    }

    renderBirthMessage(childName: string, formattedDob: string) {
        this._childName = childName;
        this._formattedDob = formattedDob;
        this._standardMessage = 'Whooa well done and congratulations on the birth of ' + this._childName + ' on ' + this._formattedDob;
    }

}