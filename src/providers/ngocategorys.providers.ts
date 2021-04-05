import { NgoCategory } from 'src/entities/ngocategory.entity';

export const ngocategorysProviders = [
  {
    provide: 'NGOCATEGORY_REPOSITORY',
    useValue: NgoCategory,
  },
];