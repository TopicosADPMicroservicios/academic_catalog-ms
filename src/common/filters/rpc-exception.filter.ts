import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<any> {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    console.log('Exception caught in microservice:', exception);

    let statusCode = 500;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      statusCode = exception.getStatus();

      if (typeof response === 'object' && response !== null) {
        message = (response as any).message || exception.message;
        error = (response as any).error || exception.name;
      } else {
        message = exception.message;
        error = exception.name;
      }
    } else if (exception.status) {
      statusCode = exception.status;
      message = exception.message || 'Unknown error';
      error = exception.name || 'Error';
    } else {
      message = exception.message || exception.toString();
      error = exception.name || 'Error';

      if (
        message.toLowerCase().includes('no encontrado') ||
        message.toLowerCase().includes('not found')
      ) {
        statusCode = 404;
        error = 'Not Found';
      }
    }

    return throwError(
      () =>
        new RpcException({
          statusCode,
          message,
          error,
        }),
    );
  }
}
