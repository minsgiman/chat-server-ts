import chatRoomManager from './../service/chat-room-manager';
import clientManager from './../service/client-manager';
import msgSender from './../router/msg-sender';
import * as I from "./interfaces";

export default function (socketId: string, message: I.InviteAcceptReq) {
    const client = clientManager.findClientBySocketId(socketId);
    let msgToSend: I.InviteAcceptRes;
    if (client.enterRoomId != null) {
        chatRoomManager.leaveRoom(client.enterRoomId, client.userId);
    }

    const resultCode = chatRoomManager.enterRoom(message.roomId, client);
    if (resultCode === 1) {
        client.enterRoomId = message.roomId;

        const room = chatRoomManager.chatRoomMap[client.enterRoomId];
        const pushMsg: I.InviteAcceptPush = {
            type: 'push',
            sender: client.userId,
            contentType: 'noti',
            content: client.userId + '님이 입장하였습니다.'
        };
        room.publish(pushMsg);
        const socket = require('./../server').getSocket(socketId);
        socket.join(client.enterRoomId);

        msgToSend = {
            type: 'res',
            code: resultCode,
            name: room.name,
            roomId: room.roomId
        }
    } else {
        msgToSend = {
            type: 'res',
            code: resultCode
        }
    }

    msgSender.sendMessage({
        event : 'inviteAccept',
        message : msgToSend,
        socketId : socketId
    });
};