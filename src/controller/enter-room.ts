import chatRoomManager from './../service/chat-room-manager';
import clientManager from './../service/client-manager';
import msgSender from './../router/msg-sender';
import * as I from "./interfaces";

export default function (socketId: string, message) {
    const client = clientManager.findClientBySocketId(socketId),
        resultCode = chatRoomManager.enterRoom(message.roomId, client);
    let msgToSend;

    if (resultCode === 1) {
        client.enterRoomId = message.roomId;

        const room = chatRoomManager.chatRoomMap[client.enterRoomId];
        room.publish({
            type: 'push',
            sender: client.userId,
            contentType: 'noti',
            content: client.userId + '님이 입장하였습니다.'
        });
        const socket = require('./../server').getSocket(socketId);
        socket.join(client.enterRoomId);

        msgToSend = {
            type: 'res',
            code: resultCode,
            name: room.name,
            roomId: room.roomId
        };
    } else {
        msgToSend = {
            type: 'res',
            code: resultCode
        }
    }

    msgSender.sendMessage({
        event : 'enterRoom',
        message : msgToSend,
        socketId : socketId
    });
};