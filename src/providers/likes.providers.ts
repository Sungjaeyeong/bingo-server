import { Like } from 'src/entities/like.entity';

export const likesProviders = [
  {
    provide: 'LIKE_REPOSITORY',
    useValue: Like,
  },
];