// socketManager.js
import { io } from 'socket.io-client';

import { Socket } from 'socket.io-client';

export let socket: Socket | null = null;

export const connectSocket = async () => {
    if (!socket) {
        const options = {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttemps: 10,
            rememberUpgrade: false,
            transports: ['websocket'],
            secure: true,
            rejectUnauthorized: false,
        };
        socket = io(process.env.NEXT_PUBLIC_SK_URL, options);
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
