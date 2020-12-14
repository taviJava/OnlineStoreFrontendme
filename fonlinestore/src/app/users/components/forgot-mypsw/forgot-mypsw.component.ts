import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-mypsw',
  templateUrl: './forgot-mypsw.component.html',
  styleUrls: ['./forgot-mypsw.component.css']
})
export class ForgotMypswComponent implements OnInit {
  email = '';
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }
// tslint:disable-next-line:typedef
  onSubmit(){
    this.userService.forgotPassword(this.email, new User()).subscribe(data => {
      this.router.navigate(['login']);
    });
}
}
