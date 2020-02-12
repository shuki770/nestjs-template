import { Param } from '@nestjs/common';
import { ObjectIdValidationPipe } from '../pipes/object-id.pipe';

export const ObjectIdParam = (property: string) => Param(property, new ObjectIdValidationPipe());
