import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../servicios/token.service';
import { AuthService } from '../servicios/auth.service';

const AUTHORIZATION = "Authorization";
const BEARER = "Bearer ";

@Injectable()
export class UsuarioInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private authService: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }
    let initReq = req;
    let token = this.tokenService.getToken();
    initReq = this.addToken(req, token!);

    return next.handle(initReq);
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set(AUTHORIZATION, BEARER + token) });
  }

}