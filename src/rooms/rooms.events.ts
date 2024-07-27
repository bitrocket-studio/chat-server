import { Server, Socket } from 'socket.io';
import { eventEmitter } from '../helpers/eventEmitter';

export const setupRoomEvents = (socket: Socket, io: Server): void => {
  eventEmitter.on('room-created', room => {
    console.log('Room created event received:', room);
    io.emit('new-room', room);
  });

  eventEmitter.on('room-joined', id_room => {
    console.log('Room joined event received:', id_room);
    socket.join(id_room);
  });

  eventEmitter.on('room-data', ({ id_room, numOfUsers }) => {
    console.log('Room data event received:', id_room, numOfUsers);
    io.to(id_room).emit('room-data', { id_room, numOfUsers });
  });

  eventEmitter.on('room-deleted', id_room => {
    console.log('Room deleted event received:', id_room);
    io.emit('deleted-room', id_room);
  });
};
