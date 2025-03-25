import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        return next.handle().pipe(
            tap(() => console.log(`${new Date().toLocaleString()}, Metodo: ${method}, A la ruta: ${url}`))
        );
    }

}