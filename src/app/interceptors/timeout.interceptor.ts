import {  HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError, timeout } from "rxjs";

export const timeoutInterceptor: HttpInterceptorFn = (req, next) => {

    const timeoutValue = Number(req.headers.get('timeout') || 5000);

    return next(req).pipe(

        timeout(timeoutValue), 
        catchError(error => {

            return throwError(() => error);
        })
    );
};
