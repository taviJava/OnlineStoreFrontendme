import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {User} from '../model/user';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';

class AuthService {
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
