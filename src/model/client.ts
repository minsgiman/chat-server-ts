import * as I from "./interfaces";

export default class client implements I.ClientInterface {
    private _userId: string;
    private _socketId: string;
    private _enterRoomId: number;

    constructor (clientData) {
        this._userId = clientData.userId;
        this._socketId = clientData.socketId;
        this._enterRoomId = null;
    }

    get userId() {
        return this._userId;
    }

    get socketId() {
        return this._socketId;
    }

    get enterRoomId() {
        return this._enterRoomId;
    }

    set enterRoomId(roomId) {
        this._enterRoomId = roomId;
    }
}