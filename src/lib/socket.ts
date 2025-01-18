// socketManager.js
import { io } from 'socket.io-client';

import { Socket } from 'socket.io-client';

export let socket: Socket | null = null;

export const connectSocket = async () => {
    if (!socket) {
        const options = {
            rememberUpgrade: true,
            transports: ['websocket'],
            secure: true,
            rejectUnauthorized: false,
        };
        socket = io(process.env.SK_PUBLIC_URL, options);
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
