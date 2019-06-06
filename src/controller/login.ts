import clientManager from './../service/client-manager';
import msgSender from './../router/msg-sender';
import * as I from './interfaces';

export default function (socketId: string, message: I.LoginReq) {
    const resultCode = clientManager.createUser({
        userId : message.userId,
        socketId : socketId
    });
    const resMessage: I.LoginRes = {
        type: 'res',
        code: resultCode
    };
    msgSender.sendMessage({
        event : 'login',
        message : resMessage,
        socketId : socketId
    });
};