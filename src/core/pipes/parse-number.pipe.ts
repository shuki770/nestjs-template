import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseNumberPipe implements PipeTransform {
  public transform(str: string, metadata: ArgumentMetadata): number | undefined {
    if (!str) {
      return undefined;
    }

    return parseFloat(str);
  }
}
