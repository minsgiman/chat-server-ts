/** login **/
export interface LoginRes {
    type: string,
    code: number
};

export interface LoginReq {
    type: string,
    userId: string
};

/** leave-room **/
export interface LeaveRoomRes {
    type: string,
    code: number
};

export interface LeaveRoomReq {
    type: string
};

/** invite-accept **/
export interface InviteAcceptPush {
    type: string,
    sender: string,
    contentType: string,
    content: string
};

export interface InviteAcceptRes {
    type: string,
    code: number,
    name?: string,
    roomId?: number
};

export interface InviteAcceptReq {
    type: string,
    roomId: number
};

/** invite **/
export interface InvitePush {
    type: string,
    from: string,
    name: string,
    roomId: number
};

export interface InviteRes {
    type: string,
    code: number,
    to: string
};

export interface InviteReq {
    type: string,
    from: string,
    to: string,
    roomId: number
};