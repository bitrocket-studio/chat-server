import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

export const socketAuthMiddleware = (socket: Socket, next: (err?: ExtendedError) => void): void => {
  const apiKey = socket.handshake.auth.apiKey;
  console.log(`API Key: ${apiKey}`);
  if (apiKey === process.env.API_KEY) next();
  else next(new Error('Authentication error'));
};
