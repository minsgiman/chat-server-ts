import msgSender from './../router/msg-sender';
import * as I from "./interfaces";

export default class chatRoom implements I.ChatRoomInterface {
    private _userMap: any;
    private _name: string;
    private _roomId: number;

    constructor (name, id) {
        this._userMap = {};
        this._name = name;
        this._roomId = id;
    }

    enter (user) {
        this._userMap[user.userId] = user;
    }

    leave (userId) {
        delete this._userMap[userId];
    }

    publish (message) {
        msgSender.publishMessage({
            event: 'chatMessage',
            message,
            roomId: this._roomId
        });
    }

    get userMap() {
        return this._userMap;
    }

    get name() {
        return this._name;
    }

    get roomId() {
        return this._roomId;
    }
}