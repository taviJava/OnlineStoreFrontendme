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
  }
  canActivate(): boolean {
    const privS = 'Full Control';
   // const user = JSON.parse(sessionStorage.getItem(this.USER_DATA_SESSION_ATTRIBUTE_NAME));
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }else if (this.auth.isUserLoggedIn() ) {
      this.userService.getByUsername('tavi.zorila@gmail.com').subscribe(data => {
        this.user = new User();
        this.user = data;
        this.roles = [];
        this.roles = this.user.roleList;
        console.log(this.user.email);
        console.log(this.user.roleList.length);
      });
      console.log('test');
      for (const role of this.roles) {
        for (const priv of role.privileges) {
          if (priv.name === privS) {
            return true;
          }
        }
      }
    }
    return true;
  }
}
