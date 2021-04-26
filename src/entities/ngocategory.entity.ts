import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';
import { Ngo } from './ngo.entity';

@Entity()
export class NgoCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ngoId: number;

  @Column()
  categoryId: number;

  @ManyToOne(type => Category, category => category.ngocategorys)
  category: Category;

  @ManyToOne(type => Ngo, ngo => ngo.ngocategorys)
  ngo: Ngo;
}