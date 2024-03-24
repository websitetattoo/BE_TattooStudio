import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import aqp from 'api-query-params';

@Injectable()
export class QueryParserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query') {
      return value;
    }
    return aqp(value);
  }
}
