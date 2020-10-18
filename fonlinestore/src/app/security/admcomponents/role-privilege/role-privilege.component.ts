import { Component, OnInit } from '@angular/core';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {RoleService} from '../../service/role.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from '../../model/role';
import {PrivlegesService} from '../../service/privleges.service';
import {Privilege} from '../../model/privilege';

@Component({
  selector: 'app-role-privilege',
  templateUrl: './role-privilege.component.html',
  styleUrls: ['./role-privilege.component.css']
})
export class RolePrivilegeComponent implements OnInit {
  role: Role;
  id: number;
  privileges: Privilege[];
  selectedPrivileges: Privilege[];
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private privilegeService: PrivlegesService) {
  }

  ngOnInit(): void {
    this.role = new Role();
    this.id = this.route.snapshot.params.id;
    this.roleService.getById(this.id).subscribe(data => {
      this.role = new Role();
      this.role = data;
    });
    this.privilegeService.findAll().subscribe(data => {
      this.privileges = [];
      this.privileges = data;
    });
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
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
    this.role.privileges = this.selectedPrivileges;
    this.roleService.update(this.role).subscribe(result => this.goToRoleList());
  }

  // tslint:disable-next-line:typedef
  goToRoleList() {
    this.router.navigate(['roles']);
  }
}
