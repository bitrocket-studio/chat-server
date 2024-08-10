import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Room } from '../rooms/room.entity';
import { User } from '../user/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Room, room => room.messages)
  @JoinColumn({ name: 'id_room' })
  room: Room;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({ name: 'email' })
  user: User;
}
