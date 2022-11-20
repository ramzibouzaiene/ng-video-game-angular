import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor(){}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'X-RapidAPI-Key': '7bec76f9cdmsh92c628acef8316cp1dad8ejsnf04e23e935c8',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      },
      setParams: {
        key: '84ed618d0e164796acfce66077c6916a',
      }
    });
    return next.handle(req)
  }
}
