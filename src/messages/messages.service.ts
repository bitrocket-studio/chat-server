import { z } from 'zod';
import { Room } from '../rooms/room.entity';
import { getMessages } from './messages.model';
import { ParamsApiMessageCreate, SchemaMessage, SchemaParamsApiMessageCreate } from './messages.schema';

export const serviceMessageList = async (id_room: Room['id']) => {
  try {
    z.string().parse(id_room);
    const messages = await getMessages(id_room);
    return messages.map(message => SchemaMessage.parse(message));
  } catch (error) {
    if (error instanceof z.ZodError) console.error('Error validating', error.errors);
    console.error('Error fetching messages:', error);
    throw new Error('Database error');
  }
};

export const serviceMessageCreate = async ({ id_room, content, sid }: ParamsApiMessageCreate) => {
  try {
    SchemaParamsApiMessageCreate.parse({ id_room, content, sid });
    // const response = await client.query<ModelMessage>(
    //   `INSERT INTO messages (content, username, id_room) VALUES ($1, $2, $3) RETURNING *`,
    //   [content, username, id_room],
    // );
    // const messageCreated = SchemaMessage.parse(response.rows[0]);
    // return messageCreated;
  } catch (error) {
    if (error instanceof z.ZodError) console.error('Error validating', error.errors);
    console.error('Error creating message:', error);
    throw new Error('Database error');
  }
};
