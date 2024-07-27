import { Socket, Server } from 'socket.io';
// import client from '../config/database';
import { joinRoom, updateRoomCounter } from './rooms.model';
import { eventEmitter } from '../helpers/eventEmitter';

export const socketRooms = (socket: Socket, io: Server) => {
  socket.on('join-room', async ({ id_room }) => {
    try {
      await joinRoom(id_room, socket.id);
      eventEmitter.emit('room-joined', id_room);
      const { numOfUsers } = await updateRoomCounter(id_room);
      eventEmitter.emit('room-data', { id_room, numOfUsers });
    } catch (error) {
      console.error('Error joining room:', error);
      socket.emit('error', 'Failed to join room');
    }
  });

  socket.on('leave-room', async id_room => {
    try {
      // await client.query('BEGIN');
      // await client.query(`UPDATE connected_users SET id_room = NULL WHERE socket_id = $1 AND id_room = $2`, [
      //   socket.id,
      //   id_room,
      // ]);
      socket.leave(id_room);

      // const res = await client.query('SELECT COUNT(*) FROM connected_users WHERE id_room = $1', [id_room]);
      // await client.query('COMMIT');
      // io.to(id_room).emit('room-data', { id_room, numOfUsers: res.rows[0].count });
      // io.emit('room-data', { id_room, numOfUsers: res.rows[0].count });
    } catch (error) {
      // await client.query('ROLLBACK');
      console.error('Error leaving room:', error);
      socket.emit('error', 'Failed to leave room');
    }
  });
};
