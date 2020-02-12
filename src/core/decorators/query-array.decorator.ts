import { Query, PipeTransform, Type } from '@nestjs/common';
import { StringToArrayPipe } from '../pipes/string-to-array.pipe';

export const QueryArray = (property: string, ...pipes: Array<Type<PipeTransform> | PipeTransform>) =>
  Query(property, new StringToArrayPipe(), ...pipes);
