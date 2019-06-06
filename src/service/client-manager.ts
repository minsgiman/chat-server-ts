import chatClient from './../model/client';

class clientManager {
    private _clientMap: any;
    private _userSocketIdMap: any;

    constructor () {
        this._clientMap = {};
        this._userSocketIdMap = {};
    }

    createUser (clientData): number {
        if (this.getSocketIdByUserId(clientData.userId)) {
            return -1;
        }
        const client: chatClient = new chatClient(clientData);
        this._clientMap[client.socketId] = client;
        this._userSocketIdMap[client.userId] = client.socketId;
        return 1;
    }

    removeUser (socketId: string) {
        const client: chatClient = this._clientMap[socketId];

        if (client) {
            delete this._userSocketIdMap[client.userId];
            delete this._clientMap[socketId];
        }
    }

    getSocketIdByUserId (userId: string): string {
        return this._userSocketIdMap[userId];
    }

    findClientBySocketId (socketId): chatClient {
        return this._clientMap[socketId];
    }
}

export default new clientManager();