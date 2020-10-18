import { Component, OnInit } from '@angular/core';
import {Role} from '../../model/role';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleService} from '../../service/role.service';
import {User} from '../../../users/model/user';
import {UserService} from '../../../users/service/user.service';

@Component({
  selector: 'app-role-user',
  templateUrl: './role-user.component.html',
  styleUrls: ['./role-user.component.css']
})
export class RoleUserComponent implements OnInit {
  role: Role;
  id: number;
  users: User[] = [];
  selectedUsers: User[];
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.role = new Role();
    this.id = this.route.snapshot.params.id;
    this.users = [];
    this.roleService.getById(this.id).subscribe(data => {
      this.role = new Role();
      this.role = data;
    });
    this.userService.findAll().subscribe(data => {
      this.users = [];
      this.users = data;
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'email',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  // tslint:disable-next-line:typedef
  onItemSelect(item: any) {
    console.log(item);
  }
  // tslint:disable-next-line:typedef
  onSelectAll(items: any) {
    console.log(items);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.role.users = this.selectedUsers;
    this.roleService.update(this.role).subscribe(result => this.goToRoleList());
  }

  // tslint:disable-next-line:typedef
  goToRoleList() {
    this.router.navigate(['roles']);
  }

}
