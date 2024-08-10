import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
import routerRooms from './rooms/rooms.router';
import { middlewareLogger } from './sockets/logger.middleware';
import { Database } from './config/database';
import { createServer } from 'http';
import { initSocketService } from './sockets/socket.service';
import { PORT } from './config/environment';
import { configOAuth } from './config/oauth';
import { configCors } from './config/cors';
import { createUser, findUser, isUserRegistered } from './user/user.model';

Database.initialize().then(db => {
  const app = express();
  const server = createServer(app);
  initSocketService(server);

  console.log(`Database ${db.options.database} connected`);

  // Middleware
  app.use(auth(configOAuth));
  app.use(cors(configCors));
  app.use(express.json());
  app.use(middlewareLogger);

  // Routes
  app.use('/api/rooms', routerRooms);

  app.get('/login', (req, res) => res.oidc.login({ returnTo: '/' }));
  app.get('/logout', requiresAuth(), (req, res) => res.oidc.logout({ returnTo: '/' }));

  app.get('/', requiresAuth(), async (req, res) => {
    // @ts-ignore
    const isRegistered = await isUserRegistered(req.oidc.user);
    if (!isRegistered) await createUser(req.oidc.user);
    else {
      // @ts-ignore
      const user = await findUser(req.oidc.user);
      res.json(user);
    }
  });
  // Start server
  server.listen(PORT, async () => {
    console.log(`Server is running on port http:localhost:${PORT}`);
  });
});
