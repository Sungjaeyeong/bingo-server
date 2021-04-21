import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { Donate } from "./donate.entity";
import { Love } from "./love.entity";
import { NgoCategory } from "./ngocategory.entity";
import { Pocket } from "./pocket.entity";

@Entity()
export class Ngo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  logo: string;

  @Column({
    nullable: true,
  })
  video: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  since: string;

  @OneToMany(type => Pocket, pocket => pocket.ngo)
  pockets: Pocket[];

  @OneToMany(type => Donate, donate => donate.ngo)
  donates: Donate[];

  @OneToMany(type => Love, love => love.ngo)
  loves: Love[];

  @OneToMany(type => NgoCategory, ngocategory => ngocategory.ngo)
  @JoinColumn()
  ngocategorys: NgoCategory[];
}
