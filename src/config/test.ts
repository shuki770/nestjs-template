import { RecursivePartial, Config } from './config.interface';

export const testConfig: RecursivePartial<Config> = {
  cache: {
    store: 'memory',
  },
};
