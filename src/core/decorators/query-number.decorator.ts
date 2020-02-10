import { Query } from '@nestjs/common';
import { ParseNumberPipe } from '../pipes/parse-number.pipe';

export const QueryNumber = (property: string) => Query(property, new ParseNumberPipe());
