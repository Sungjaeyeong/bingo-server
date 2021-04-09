import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Ngo } from './ngo.entity';
import { User } from './user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  ngoId: number;

  @ManyToOne(type => User, user => user.likes)
  user: User;

  @ManyToOne(type => Ngo, ngo => ngo.likes)
  ngo: Ngo;
}