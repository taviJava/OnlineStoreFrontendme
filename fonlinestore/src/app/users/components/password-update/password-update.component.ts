import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {
  token: string;
  password = '';
  confirmPassword = '';
  id: number;
  photos: Observable<any>;
  myGroup: FormGroup;
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
    this.id = this.route.snapshot.params.id;
    this.photos = this.userService.getUserPhoto(this.id);
    this.myGroup = new FormGroup({
      password: new FormControl(this.password),
      confirmPassword: new FormControl(this.confirmPassword)
    });
  }
 // tslint:disable-next-line:typedef
 onSubmit(){
   this.password = this.myGroup.get('password').value;
   this.confirmPassword = this.myGroup.get('confirmPassword').value;
   this.userService.updatePassword(this.password, this.token, new User()).subscribe(data => {
  this.router.navigate(['login']);
});
 }
 ifPasswordMatch(): boolean{
   this.password = this.myGroup.get('password').value;
   this.confirmPassword = this.myGroup.get('confirmPassword').value;
   if (this.password === this.confirmPassword && this.password.length > 4){
      return false;
    }
   return true;
 }
}
