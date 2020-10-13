import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.id = this.route.snapshot.params.id;
    this.userService.getById(this.id).subscribe(data => {
      this.user = data;
    });
  }

  // tslint:disable-next-line:typedef
  goToUser() {
    this.router.navigate(['users']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.userService.update(this.user).subscribe(result => this.goToUser());
  }
}
