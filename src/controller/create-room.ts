import chatRoomManager from './../service/chat-room-manager';
import msgSender from './../router/msg-sender';
import * as I from "./interfaces";

export default function (socketId: string, message) {
    const room = chatRoomManager.createRoom(message.name);
    let msgToSend;

    if (room) {
        msgToSend = {
            type : 'res',
            code : 1,
            room : {roomId: room.roomId, name: room.name}
        };
    } else {
        msgToSend = {
            type : 'res',
            code : -1
        };
    }
    msgSender.sendMessage({
        event : 'createRoom',
        message : msgToSend,
        socketId : socketId
    });
};