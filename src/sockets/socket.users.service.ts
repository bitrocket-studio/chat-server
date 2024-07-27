import { Server } from 'socket.io';
// import client from '../config/database';

export const serviceSocketEmitUserTotal = async (io: Server) => {
  // const res = await client.query('SELECT COUNT(*) FROM connected_users');
  // io.emit('total-users', res.rows[0].count);
};

export const serviceSocketEmitRoomData = async (io: Server, id_room: string) => {
  // const resCount = await client.query('SELECT COUNT(*) FROM connected_users WHERE id_room = $1', [id_room]);
  // io.to(id_room).emit('room-data', { id_room, numOfUsers: resCount.rows[0].count });
};
