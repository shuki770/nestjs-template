import { defaultConfig } from './default';
import { developmentConfig } from './development';
import { productionConfig } from './production';
import { testConfig } from './test';
import { stageConfig } from './stage';
import { merge } from 'lodash';
import { Config } from './config.interface';

const environmentConfig = {
  development: developmentConfig,
  production: productionConfig,
  test: testConfig,
  stage: stageConfig,
};

export const config: Config = merge(defaultConfig, environmentConfig[defaultConfig.environment]);
