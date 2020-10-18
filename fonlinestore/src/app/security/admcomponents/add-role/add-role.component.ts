import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleService} from '../../service/role.service';
import {Role} from '../../model/role';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  role: Role;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService) {
    this.role = new Role();
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.roleService.save(this.role).subscribe(result => this.goToRoleList());
  }

  // tslint:disable-next-line:typedef
  goToRoleList() {
    this.router.navigate(['roles']);
  }

  ngOnInit(): void {
  }

}
