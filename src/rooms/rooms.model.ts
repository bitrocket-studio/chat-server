import { v4 as uuidv4 } from 'uuid';
import { Room } from './room.entity';
import { Database } from '../config/database';
import { eventEmitter } from '../helpers/eventEmitter';
import { User } from '../user/user.entity';

export const deleteRoom = async (id: Room['id']): Promise<void> => {
  const roomRepo = Database.getRepository(Room);
  await roomRepo.delete(id);
};

export const getRooms = async () => {
  const roomRepo = Database.getRepository(Room);
  const rooms = await roomRepo.find();
  return rooms;
};

export const createRoom = async (sid: User['sid']): Promise<Room> => {
  const repoUser = Database.getRepository(User);
  const user = await repoUser.findOne({ where: { sid } });
  const room = new Room();
  room.name = uuidv4();
  room.created_at = new Date();
  room.users = [user];
  const repo = Database.getRepository(Room);
  const newRoom = repo.create(room);
  const savedRoom = await repo.save(newRoom);
  eventEmitter.emit('room-created', savedRoom);
  return newRoom;
};

export const joinRoom = async (id_room: string, id_socket: string): Promise<Room['id']> => {
  // await client.query(`UPDATE connected_users SET id_room = $1 WHERE socket_id = $2`, [id_room, id_socket]);
  return id_room;
};

export const updateRoomCounter = async (id_room: string): Promise<{ id_room: Room['id']; numOfUsers: number }> => {
  // const res = await client.query('SELECT COUNT(*) FROM connected_users WHERE id_room = $1', [id_room]);
  // return { id_room, numOfUsers: res.rows[0].count };
  return { id_room, numOfUsers: 0 };
};
