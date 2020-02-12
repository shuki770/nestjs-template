import { config } from './config.util';
import { Config, RecursivePartial } from './config.interface';
const { parse } = config;

export const productionConfig: RecursivePartial<Config> = {
  dataAccess: {
    options: {
      config: {
        autoIndex: false,
      },
    },
    debug: config.get<boolean>('MONGO_DEBUG', false, parse.boolean),
  },
};
