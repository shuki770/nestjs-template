import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(id: string, metadata: ArgumentMetadata) {

    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`The id: "${id}" is not valid`);
    }

    return id;
  }
}
