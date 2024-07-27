import { z } from 'zod';
import { createRoom, deleteRoom, getRooms } from './rooms.model';
import { eventEmitter } from '../helpers/eventEmitter';
import { Room, SchemaRoom } from './room.entity';
import { User } from '../user/user.entity';

export const serviceRoomList = async () => {
  try {
    const rooms = await getRooms();
    return rooms.map(room => SchemaRoom.parse(room));
  } catch (error) {
    if (error instanceof z.ZodError) console.error('Error validating', error.errors);
    console.error('Error fetching rooms:', error);
    throw new Error('Database error');
  }
};

export const serviceRoomCreate = async (username: User['username']): Promise<Room> => {
  try {
    const room = await createRoom(username);
    SchemaRoom.parse(room);
    eventEmitter.emit('room-created', room);
    return room;
  } catch (error) {
    if (error instanceof z.ZodError) console.error('Error validating', error.errors);
    console.error('Error creating room:', error);
    throw new Error('Database error');
  }
};

export const serviceRoomDelete = async (id: Room['id']) => {
  try {
    z.string().parse(id);
    await deleteRoom(id);
    eventEmitter.emit('room-deleted', id);
  } catch (error) {
    if (error instanceof z.ZodError) console.error('Error validating', error.errors);
    console.error('Error deleting room:', error);
    throw new Error('Database error');
  }
};
