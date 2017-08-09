import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'r2F3TiAFQy1OUq1G06RyhOtLW1vmaNOi',
    domain: 'jackiewang5566.auth0.com',
    responseType: 'token id_token',
    audience: 'https://jackiewang5566.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000',      
    scope: 'openid'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

}