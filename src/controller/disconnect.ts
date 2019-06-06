import chatRoomManager from './../service/chat-room-manager';
import clientManager from './../service/client-manager';
import logger from './../service/logger';
import * as I from "./interfaces";

export default function (socketId: string) {
    const client = clientManager.findClientBySocketId(socketId),
        leaveRoomId = client.enterRoomId;

    chatRoomManager.leaveRoom(leaveRoomId, client.userId);

    const room = chatRoomManager.chatRoomMap[leaveRoomId];
    if (room) {
        room.publish({
            type: 'push',
            sender: client.userId,
            contentType: 'noti',
            content: client.userId + '님이 나갔습니다.'
        });
    }

    clientManager.removeUser(socketId);
};