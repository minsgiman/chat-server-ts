import chatRoomManager from './../service/chat-room-manager';
import clientManager from './../service/client-manager';
import msgSender from './../router/msg-sender';
import * as I from "./interfaces";

export default function (socketId: string, message: I.LeaveRoomReq) {
    const client = clientManager.findClientBySocketId(socketId),
          leaveRoomId = client.enterRoomId,
          resultCode = chatRoomManager.leaveRoom(leaveRoomId, client.userId);

    if (resultCode === 1) {
        const socket = require('./../server').getSocket(socketId);
        socket.leave(leaveRoomId);

        const room = chatRoomManager.chatRoomMap[leaveRoomId];
        if (room) {
            room.publish({
                type: 'push',
                sender: client.userId,
                contentType: 'noti',
                content: client.userId + '님이 나갔습니다.'
            });
        }
    }
    const resMessage: I.LeaveRoomRes = {
        type : 'res',
        code : resultCode
    };
    msgSender.sendMessage({
        event : 'leaveRoom',
        message : resMessage,
        socketId : socketId
    });
};