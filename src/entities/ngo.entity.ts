import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Donate } from './donate.entity';
import { Like } from './like.entity';
import { NgoCategory } from './ngocategory.entity';
import { Pocket } from './pocket.entity';

@Table
export class Ngo extends Model<Ngo> {
  
  @Column
  name: string;

  @Column
  link: string;

  @Column
  logo: string;

  @Column
  video: string;

  @Column
  coverImage: string;

  @Column
  description: string;

  @Column
  since: string;

  @HasMany(() => NgoCategory)
  ngocategory: NgoCategory[];

  @HasMany(() => Pocket)
  pocket: Pocket[];

  @HasMany(() => Donate)
  donate: Donate[];

  @HasMany(() => Like)
  like: Like[];
}
