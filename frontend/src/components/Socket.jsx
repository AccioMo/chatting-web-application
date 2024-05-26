// import React from 'react';
// import { io } from 'socket.io-client';

const ws = new WebSocket('ws://localhost:8000/ws/chat/')

export { ws };