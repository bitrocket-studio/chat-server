import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { socketRooms } from '../rooms/room.socket';
import { socketMessages } from './messages.socket';
import { socketLoggerMiddleware } from './socket.logger.middleware';
import { serviceSocketEmitRoomData, serviceSocketEmitUserTotal } from './socket.users.service';
import { serviceSocketRoomDisconnect } from './socket.rooms.service';
import { setupRoomEvents } from '../rooms/rooms.events';
// import { socketAuthMiddleware } from '../middlewares/socket.auth.middleware';

let io: SocketIOServer;

export const initSocketService = (server: HttpServer): void => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // io.use(socketAuthMiddleware);
  io.use(socketLoggerMiddleware);

  io.on('connection', async (socket: Socket) => {
    try {
      const username = 'utente';
      // await client.query(`INSERT INTO connected_users (socket_id, username) VALUES ($1, $2)`, [socket.id, username]);
      await serviceSocketEmitUserTotal(io);

      socketRooms(socket, io);
      socketMessages(socket, io);

      setupRoomEvents(socket, io);

      socket.on('disconnect', async () => {
        try {
          // await client.query('BEGIN');
          const res = await serviceSocketRoomDisconnect(socket);
          // if (!!res.rowCount && res.rowCount > 0) {
          //   const { id_room } = res.rows[0];
          //   if (!!id_room) await serviceSocketEmitRoomData(io, id_room);
          // }
          // await client.query('COMMIT');
          await serviceSocketEmitUserTotal(io);
        } catch (error) {
          // await client.query('ROLLBACK');
          console.error('Error during disconnect:', error);
        }
      });
    } catch (error) {
      // await client.query('ROLLBACK');
      console.error('Error inserting connected user and fetching all users:', error);
    }
  });
};

export const getIo = (): SocketIOServer => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};
