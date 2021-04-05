import { Pocket } from 'src/entities/pocket.entity';

export const pocketsProviders = [
  {
    provide: 'POCKET_REPOSITORY',
    useValue: Pocket,
  },
];