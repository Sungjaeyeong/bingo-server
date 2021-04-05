import { Category } from 'src/entities/category.entity';

export const categorysProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useValue: Category,
  },
];