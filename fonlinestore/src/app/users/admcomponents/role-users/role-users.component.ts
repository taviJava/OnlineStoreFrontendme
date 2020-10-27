import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-role-users',
  templateUrl: './role-users.component.html',
  styleUrls: ['./role-users.component.css']
})
export class RoleUsersComponent implements OnInit {
  id: number;
  user: User = new User();
  roles: string[] = [];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.roles.push('Administrator');
    this.roles.push('Standard');
    this.user = new User();
    this.id = this.route.snapshot.params.id;
    this.userService.getById(this.id).subscribe(data =>
    {
      this.user = new User();
      this.user = data;
    });
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.userService.update(this.user).subscribe(data => {
      this.router.navigate(['users']);
    });
  }

}
