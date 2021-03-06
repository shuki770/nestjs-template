import { Config, RecursivePartial } from './config.interface';

export const developmentConfig: RecursivePartial<Config> = {
  cache: {
    store: 'memory',
  },
};
