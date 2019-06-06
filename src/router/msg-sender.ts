import logger from './../service/logger';
import {getSocketIO} from './../server';

const socketIO = getSocketIO();

export default {
    sendMessage : (param) => {
        if (param && param.event && param.message && param.socketId) {
            logger.debug('send socket message - event(' + param.event + '), message(' + JSON.stringify(param.message) + ')');
            socketIO.to(param.socketId).emit(param.event, param.message);
        }
    },

    publishMessage : (param) => {
        if (param && param.event && param.message && param.roomId !== undefined) {
            logger.debug('publish socket message - roomId(' + param.roomId + '), event(' + param.event + '), message(' + JSON.stringify(param.message) + ')');
            socketIO.sockets.in(param.roomId).emit(param.event, param.message);
        }
    }
};
