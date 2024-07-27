import { Socket, Server } from 'socket.io';
// import client from '../config/database';

export const socketMessages = (socket: Socket, io: Server): void => {
  socket.on('send-message', ({ content, username, id_room }) => {
    console.log(`Message sent: ${content} from ${username} in room ${id_room}`);
    // client.query(
    //   `INSERT INTO messages (content, username, id_room) VALUES ($1, $2, $3) RETURNING *`,
    //   [content, username, id_room],
    //   (error, res) => {
    //     if (!error) io.to(id_room).emit('new-message', res.rows[0]);
    //   },
    // );
  });
};
