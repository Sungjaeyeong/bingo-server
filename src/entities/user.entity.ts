import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Donate } from './donate.entity';
import { Like } from './like.entity';
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

  @OneToMany(type => Pocket, pocket => pocket.userId)
  pockets: Pocket[];

  @OneToMany(type => Donate, donate => donate.userId)
  donates: Donate[];

  @OneToMany(type => Like, like => like.userId)
  likes: Like[];

}