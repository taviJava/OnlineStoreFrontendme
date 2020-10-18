import { Component, OnInit } from '@angular/core';
import {User} from '../../users/model/user';
import {AuthenticationService} from '../../users/service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-app',
  templateUrl: './menu-app.component.html',
  styleUrls: ['./menu-app.component.css']
})
export class MenuAppComponent implements OnInit {

  public isMenuCollapsed = true;
  isLoggedIn = false;
  currentUser: User;

  constructor(private authService: AuthenticationService,
              private router: Router) {
    this.currentUser = new User();
    this.currentUser.email = '';
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.currentUser = new User();
      if (this.isLoggedIn) {

        this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
        if (this.currentUser === null) {
          this.currentUser = new User();
        }
      }
    });
  }

  // tslint:disable-next-line:typedef
  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  hasPrivilege(privS: string): boolean {
    return this.authService.hasPrivilege(privS);
  }
}
