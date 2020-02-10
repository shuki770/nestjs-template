import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class StringToArrayPipe implements PipeTransform {
  public transform(str: string, metadata: ArgumentMetadata): string[] | undefined {
    if (!str) {
      return undefined;
    }

    return str
      .split(',')
      .map(item => item.trim())
      .filter(item => !!item);
  }
}
