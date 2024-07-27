import { EventEmitter } from 'node:events';
import { Room } from '../rooms/room.entity';

interface EventTypes {
  'room-created': Room;
  'room-joined': string;
  'room-data': { id_room: string; numOfUsers: number };
  'room-deleted': Room['id'];
}

class TypedEventEmitter<T> extends EventEmitter {
  // @ts-ignore
  emit<K extends keyof T>(event: K, ...args: T[K] extends undefined ? [] : [T[K]]): boolean {
    return super.emit(event as string, ...args);
  }
  // @ts-ignore
  on<K extends keyof T>(event: K, listener: (payload: T[K]) => void): this {
    return super.on(event as string, listener);
  }
  // @ts-ignore
  once<K extends keyof T>(event: K, listener: (payload: T[K]) => void): this {
    return super.once(event as string, listener);
  }

  // @ts-ignore
  off<K extends keyof T>(event: K, listener: (payload: T[K]) => void): this {
    return super.off(event as string, listener);
  }
}

export const eventEmitter = new TypedEventEmitter<EventTypes>();
