import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { Message } from '../messages/messages.entity';
import { Room } from '../rooms/room.entity';
import { User } from '../user/user.entity';

export const Database = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'chat-app',
  synchronize: true,
  logging: false,
  entities: [Room, Message, User],
  migrations: [],
  subscribers: [],
  ssl: false,
});
