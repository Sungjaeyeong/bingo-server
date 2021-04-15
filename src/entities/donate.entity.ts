import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Ngo } from "./ngo.entity";
import { User } from "./user.entity";
@Entity()
export class Donate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  money: number;

  @Column()
  createdAt: Date;

  @Column()
  type: string;

  @Column()
  ing: boolean;

  @Column()
  message: string;

  @Column()
  userId: number;

  @Column()
  ngoId: number;

  @ManyToOne(type => User, user => user.donates)
  user: User;

  @ManyToOne(type => Ngo, ngo => ngo.donates)
  ngo: Ngo;
}
