import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, CreateDateColumn } from 'typeorm';
import { z } from 'zod';
import { Message } from '../messages/messages.entity';
import { User } from '../user/user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Message, message => message.room)
  messages: Message[];

  @ManyToMany(() => User, user => user.rooms)
  users: User[];
}

export const SchemaRoom = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.date(),
});
