import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { NgoCategory } from './ngocategory.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  coverImage: string;

  @OneToMany(type => NgoCategory, ngocategory => ngocategory.category)
  ngocategorys: NgoCategory[];
}