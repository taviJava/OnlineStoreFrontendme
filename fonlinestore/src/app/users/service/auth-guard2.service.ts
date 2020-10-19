import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {User} from '../model/user';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {AuthenticationService} from './authentication.service';
import {Role} from '../../security/model/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard2Service implements CanActivate {
  TOKEN_SESSION_ATTRIBUTE_NAME = 'authenticatedUserToken';
  USER_DATA_SESSION_ATTRIBUTE_NAME = 'authenticatedUserData';
  public password: string;
  public user: User = new User();
  roles: Role[] = [];
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(public auth: AuthenticationService, public router: Router, public userService: UserService) {
    this.user = new User();
    this.roles = [];
  }
  canActivate(): boolean {
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }else if (this.auth.isUserLoggedIn() && this.hasPrivilege() ) {
    return true;
    }
    return false;
  }
  hasPrivilege(): boolean {
    return this.auth.hasPrivilege();
  }
}
