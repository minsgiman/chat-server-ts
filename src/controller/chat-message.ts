import chatRoomManager from './../service/chat-room-manager';
import clientManager from './../service/client-manager';
import msgSender from './../router/msg-sender';
import * as I from "./interfaces";

export default function (socketId: string, message) {
    const client = clientManager.findClientBySocketId(socketId);
    const room = chatRoomManager.chatRoomMap[client.enterRoomId];

    if (room) {
        const content = message.content;
        room.publish({
            type: 'push',
            sender: client.userId,
            contentType: content.type,
            content: content.data
        });
    }

    msgSender.sendMessage({
        event : 'chatMessage',
        message : {
            type : 'res',
            code : room ? 1 : -1
        },
        socketId : socketId
    });
};