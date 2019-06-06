import * as http from 'http';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as socketIO from 'socket.io';
import * as socketWildcard from 'socketio-wildcard';
import config from './config/server';
import logger from './service/logger';
import socketMsgRouter from './router/socket-msg-router';

logger.loggerInit();

if (process) {
    process.on('uncaughtException', (err) => {   // Exception Handler
        logger.error('Error Worker Caught exception: ' + err);
    });
}
logger.debug('init server');

/** Service Init **/
const expressApp = express();
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'ejs');
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());
expressApp.use(express.static(path.join(__dirname, './../public')));

const httpServer = http.createServer(expressApp).listen(config.PORT, () => {});

// upgrade http server to socket.io server
const socketIOServer = socketIO.listen(httpServer, {
    'pingTimeout': (config.PING_TIMEOUT) * 1000,
    'pingInterval': (config.PING_INTERVAL) * 1000
});
socketIOServer.use(socketWildcard());

socketIOServer.on('connection', (socket) => {
    socketMsgRouter(socket);
});

export let getSocketIO = (): any => socketIOServer;

export let getSocket = (socketId: string): any => {
    return socketIOServer.sockets.connected[socketId];
};
