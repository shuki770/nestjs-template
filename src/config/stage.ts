import { config } from './config.util';
import { RecursivePartial, Config } from './config.interface';
const { parse } = config;

export const stageConfig: RecursivePartial<Config> = {

  dataAccess: {
    options: {
      config: {
        autoIndex: false,
      },
    },
    debug: config.get<boolean>('MONGO_DEBUG', false, parse.boolean),
  },
};
