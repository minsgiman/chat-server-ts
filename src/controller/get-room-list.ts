import chatRoomManager from './../service/chat-room-manager';
import msgSender from './../router/msg-sender';
import * as I from "./interfaces";

export default function (socketId: string, message) {
    const chatRooms = [];

    if (chatRoomManager.chatRoomMap) {
        for (let key in chatRoomManager.chatRoomMap) {
            if (chatRoomManager.chatRoomMap[key]) {
                chatRooms.push({
                    name : chatRoomManager.chatRoomMap[key].name,
                    roomId : chatRoomManager.chatRoomMap[key].roomId
                });
            }
        }
    }

    msgSender.sendMessage({
        event : 'getRoomList',
        message : {
            type : 'res',
            code : 1,
            rooms : chatRooms
        },
        socketId : socketId
    });
};