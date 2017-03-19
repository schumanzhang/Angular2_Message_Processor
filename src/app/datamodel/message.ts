export class Message {

    _messageType: string;
    _name: string;
    
    constructor(messageType: string, name: string) {
        this._messageType = messageType;
        this._name = name;
    }

    get messageType(): string {
        return this._messageType;
    }

    set messageType(messageType: string) {
        this._messageType = messageType;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    renderStandardMessage(selectedGift: string) {
    }

    renderBirthMessage(childName: string, formattedDob: string) {
    }

}