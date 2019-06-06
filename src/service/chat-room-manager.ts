import chatRoom from './../model/chat-room';
import logger from './../service/logger';

class chatRoomManager {
    private _chatRoomMap: any;
    private _incrKey: number;

    constructor () {
        this._chatRoomMap = {};
        this._incrKey = 0;
    }

    createRoom (name: string): chatRoom {
        const roomId = this._incrKey;
        this._incrKey += 1;
        this._chatRoomMap[roomId] = new chatRoom(name, roomId);

        return this._chatRoomMap[roomId];
    }

    enterRoom (roomId: number, user: any) {
        const room = this._chatRoomMap[roomId];
        if (!user) {
            return -1;
        }
        if (!room) {
            return -2;
        }
        room.enter(user);
        return 1;
    }

    leaveRoom (roomId: number, userId: string) {
        const room = this._chatRoomMap[roomId];

        if (room) {
            room.leave(userId);
            logger.debug('after leave : ' + JSON.stringify(room.userMap));
            if (Object.keys(room.userMap).length <= 0) {
                delete this._chatRoomMap[roomId];
            }
            return 1;
        } else {
            return -1;
        }
    }

    get chatRoomMap() {
        return this._chatRoomMap;
    }
}

export default new chatRoomManager();