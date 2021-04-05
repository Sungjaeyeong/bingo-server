import { Ngo } from 'src/entities/ngo.entity';

export const ngosProviders = [
  {
    provide: 'NGO_REPOSITORY',
    useValue: Ngo,
  },
];