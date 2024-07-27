import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import routerRooms from './rooms/rooms.router';
import { middlewareLogger } from './sockets/logger.middleware';
import { Database } from './config/database';
import { createServer } from 'http';
import { initSocketService } from './sockets/socket.service';
import { PORT } from './config/environment';

Database.initialize().then(db => {
  const app = express();
  console.log(`Database ${db.options.database} connected`);
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );
  app.use(express.json());
  app.use(middlewareLogger);
  app.use('/api/rooms', routerRooms);

  const server = createServer(app);

  initSocketService(server);

  server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
