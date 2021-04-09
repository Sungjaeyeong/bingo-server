import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { NgoCategory } from './ngocategory.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => NgoCategory, ngocategory => ngocategory.categoryId)
  ngocategorys: NgoCategory[];
}