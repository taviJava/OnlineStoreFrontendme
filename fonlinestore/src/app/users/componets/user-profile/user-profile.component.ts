import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {AuthenticationService} from '../../service/authentication.service';
import {Observable} from 'rxjs';
import {Address} from '../../model/address';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  id: number;
  currentUser: User;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthenticationService) { this.currentUser = new User();
                                                            this.currentUser.email = 'Please Log-in'; }

  ngOnInit(): void {
    this.user = new User();
    this.user.adress = new Address();
    this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
    this.userService.getByUsername(this.currentUser.email).subscribe(data => {
      this.user = new User();
      this.user.adress = new Address();
      this.user = data;
      this.user.photo = this.getPhoto(this.user.id);
    }
    );
  }
  getPhoto(id: number): Observable<any>{
    return this.userService.getUserPhoto(id);
  }
  // tslint:disable-next-line:typedef
  goToChangePhoto(){
    this.router.navigate(['changePhoto/' + this.user.id]);
  }
}
