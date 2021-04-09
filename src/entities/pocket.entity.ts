import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Ngo } from './ngo.entity';
import { User } from './user.entity';

@Entity()
export class Pocket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  money: string;

  @Column()
  userId: number;

  @Column()
  ngoId: number;

  @ManyToOne(type => User, user => user.pockets)
  user: User;

  @ManyToOne(type => Ngo, ngo => ngo.pockets)
  ngo: Ngo;
}