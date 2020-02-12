import { Query } from '@nestjs/common';
import { ParseBooleanPipe } from '../pipes/parse-boolean.pipe';

export const QueryBoolean = (property: string) => Query(property, new ParseBooleanPipe());
