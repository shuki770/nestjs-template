import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseBooleanPipe implements PipeTransform {
  public transform(str: string, metadata: ArgumentMetadata): boolean {
    return str === 'true' || str === '1';
  }
}
