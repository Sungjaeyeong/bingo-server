import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Ngo } from './ngo.entity';

@Table
export class NgoCategory extends Model<NgoCategory> {

  @Column
  ngoId: number;

  @Column
  categoryId: number;
}