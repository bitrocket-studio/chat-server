import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

export const socketLoggerMiddleware = (socket: Socket, next: (err?: ExtendedError) => void): void => {
  console.log(`Socket connected: ${socket.id}`);

  socket.onAny((event, ...args) => {
    console.log(`Socket event: ${event}`, args);
  });
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });

  next();
};
