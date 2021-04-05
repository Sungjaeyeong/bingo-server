import { Donate } from 'src/entities/donate.entity';


export const donatesProviders = [
  {
    provide: 'DONATE_REPOSITORY',
    useValue: Donate,
  },
];