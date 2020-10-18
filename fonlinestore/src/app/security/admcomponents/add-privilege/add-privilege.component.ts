import { Component, OnInit } from '@angular/core';
import {Privilege} from '../../model/privilege';
import {ActivatedRoute, Router} from '@angular/router';
import {PrivlegesService} from '../../service/privleges.service';

@Component({
  selector: 'app-add-privilege',
  templateUrl: './add-privilege.component.html',
  styleUrls: ['./add-privilege.component.css']
})
export class AddPrivilegeComponent implements OnInit {

  privilege: Privilege;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private privilegeService: PrivlegesService) {
    this.privilege = new Privilege();
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.privilegeService.save(this.privilege).subscribe(result => this.goToPrivilegeList());
  }

  // tslint:disable-next-line:typedef
  goToPrivilegeList() {
    this.router.navigate(['privileges']);
  }

  ngOnInit(): void {
  }
}
