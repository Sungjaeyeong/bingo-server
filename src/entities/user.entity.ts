import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Donate } from './donate.entity';
import { Love } from './love.entity';
import { Pocket } from './pocket.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  profileImage: string;

  @Column({
    nullable: true,
  })
  level: string;

  @Column({
    nullable: true,
  })
  googleId: string;

  @Column({
    nullable: true,
  })
  kakaoId: number;

  @Column({
    nullable: true,
  })
  accessToken: string;

  @Column({
    nullable: true,
  })
  refreshToken: string;

  @OneToMany(type => Pocket, pocket => pocket.user)
  pockets: Pocket[];

  @OneToMany(type => Donate, donate => donate.user)
  donates: Donate[];

  @OneToMany(type => Love, love => love.user)
  loves: Love[];

}