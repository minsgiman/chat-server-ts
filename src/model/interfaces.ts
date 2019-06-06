export interface ChatRoomInterface {
    readonly name: string;
    readonly roomId: number;
    readonly userMap: any;

    enter (user);
    leave (userId: string);
    publish (message);
};

export interface ClientInterface {
    readonly userId: string;
    readonly socketId: string;
    enterRoomId: number;
};