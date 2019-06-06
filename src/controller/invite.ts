import chatRoomManager from './../service/chat-room-manager';
import clientManager from './../service/client-manager';
import msgSender from './../router/msg-sender';
import * as I from "./interfaces";

export default function (socketId: string, message: I.InviteReq) {
    const toSocketId = clientManager.getSocketIdByUserId(message.to);
    const room = chatRoomManager.chatRoomMap[message.roomId];
    let resultCode, pushMsg: I.InvitePush, resMsg: I.InviteRes;

    if (!toSocketId) {
        resultCode = -1;
    } else if (!room) {
        resultCode = -2;
    } else if (room.userMap[message.to]) {
        resultCode = -3;
    } else {
        pushMsg = {
            type : 'push',
            from : message.from,
            name : room.name,
            roomId : room.roomId
        };
        msgSender.sendMessage({
            event : 'invite',
            message : pushMsg,
            socketId : toSocketId
        });
        resultCode = 1;
    }
    resMsg = {
        type : 'res',
        code : resultCode,
        to : message.to
    };
    msgSender.sendMessage({
        event : 'invite',
        message : resMsg,
        socketId : socketId
    });
};