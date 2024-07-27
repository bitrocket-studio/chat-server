import { Socket } from 'socket.io';
// import client from '../config/database';

export const serviceSocketRoomDisconnect = async (socket: Socket) => {
  try {
    // const res = await client.query(`DELETE FROM connected_users WHERE socket_id = $1 RETURNING id_room`, [socket.id]);
    // return res;
  } catch (error) {
    console.error('Error disconnecting user:', error);
    throw new Error('Database error');
  }
};
