import { Database } from '../config/database';
import { Room } from '../rooms/room.entity';
import { Message } from './messages.entity';

export const getMessages = async (id_room: Room['id']): Promise<Array<Message>> => {
  const messageRepo = Database.getRepository(Message);
  const messages = await messageRepo.find({ where: { room: { id: id_room } } });
  return messages;
};
