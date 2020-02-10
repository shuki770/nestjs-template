import { ValidationPipeOptions, CacheModuleOptions } from '@nestjs/common';

export type RecursivePartial<T> = T extends object ? { [K in keyof T]?: RecursivePartial<T[K]> } : T;
export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Stage = 'stage',
}

export interface Config {
  app: {
    name: string;
    description: string;
    version: string;
  };
  port: number;
  host: string;
  environment: Environment;
  isProd: boolean;
  auth?: any;
  dataAccess?: any;
  cache?: CacheModuleOptions;
  validation: ValidationPipeOptions;
  services: {};
}
