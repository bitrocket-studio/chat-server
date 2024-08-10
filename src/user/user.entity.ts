import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, CreateDateColumn, JoinTable } from 'typeorm';
import { Message } from '../messages/messages.entity';
import { Room } from '../rooms/room.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ unique: true })
  sid: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  given_name?: string;

  @Column({ nullable: true })
  family_name?: string;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  picture?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true, default: false })
  email_verified?: boolean;

  @Column({ nullable: true })
  sub?: string;

  @OneToMany(() => Message, message => message.user)
  messages: Array<Message>;

  @ManyToMany(() => Room, room => room.users)
  @JoinTable({
    name: 'user_room',
    joinColumn: { name: 'email_user' },
    inverseJoinColumn: { name: 'id_room' },
  })
  rooms: Array<Room>;
}
