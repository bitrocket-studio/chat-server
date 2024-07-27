import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, CreateDateColumn, JoinTable } from 'typeorm';
import { Message } from '../messages/messages.entity';
import { Room } from '../rooms/room.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Message, message => message.user)
  messages: Array<Message>;

  @ManyToMany(() => Room, room => room.users)
  @JoinTable({
    name: 'user_room',
    joinColumn: { name: 'id_user' },
    inverseJoinColumn: { name: 'id_room' },
  })
  rooms: Array<Room>;
}
