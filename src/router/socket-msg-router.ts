import eventMap from './event-map';
import logger from './../service/logger';
import clientManager from './../service/client-manager';

function disconnectSocket (socket) {
    socket.conn.transport.close();
    socket.disconnect();
}

export default function socketMsgRouter (socket) {
    socket.emit('loginRequired', {msg : 'Welcome to chat-server. Login Please!'});

    socket.on('*', function(sioRawMessage) {
        if (sioRawMessage && sioRawMessage.data) {
            logger.debug('sioRawMessage.data : ' + JSON.stringify(sioRawMessage.data));
            var event = sioRawMessage.data[0], message = sioRawMessage.data[1];

            if (event) {
                const loginClient = clientManager.findClientBySocketId(socket.id);
                if (event !== 'login' && !loginClient) { //login 메시지가 아닌데 로그인이 되어 있지 않은 경우
                    disconnectSocket(socket);
                    return;
                }
                if (eventMap[event]) {
                    const controller = require('./../controller/' + eventMap[event]).default;
                    if (controller) {
                        controller(socket.id, message);
                    }
                } else {
                    disconnectSocket(socket);
                }
            } else {
                disconnectSocket(socket);
            }
        }
    });

    socket.on('disconnect', function () {
        const loginClient = clientManager.findClientBySocketId(socket.id);

        if (loginClient) {
            require('./../controller/disconnect').default(socket.id);
        }
        disconnectSocket(socket);
    });

    socket.conn.on('heartbeat', function () {
    });
};