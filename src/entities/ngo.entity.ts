import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Donate } from './donate.entity';
import { Like } from './like.entity';
import { NgoCategory } from './ngocategory.entity';
import { Pocket } from './pocket.entity';

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
  since: number;

  @OneToMany(type => Pocket, pocket => pocket.ngoId)
  pockets: Pocket[];

  @OneToMany(type => Donate, donate => donate.ngoId)
  donates: Donate[];

  @OneToMany(type => Like, like => like.ngoId)
  likes: Like[];

  @OneToMany(type => NgoCategory, ngocategory => ngocategory.ngoId)
  ngocategorys: NgoCategory[];

}