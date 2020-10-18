import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PrivlegesService} from '../../service/privleges.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Privilege} from '../../model/privilege';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.css']
})
export class PrivilegeComponent implements OnInit {

  privileges: Privilege[];
  closeResult = '';

  constructor(private privilegeService: PrivlegesService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getPrivileges();
  }

  // tslint:disable-next-line:typedef
  getPrivileges() {
    this.privilegeService.findAll().subscribe(data => {
      this.privileges = data;
    });
  }

  // tslint:disable-next-line:typedef
  deletePrivilege(id: number) {
    this.privilegeService.delete(id).subscribe(data => {
      this.getPrivileges();
    });
  }

  // tslint:disable-next-line:typedef
  editPrivilege(id: number) {
    this.router.navigate(['editprivilege', id]);
  }

  // tslint:disable-next-line:typedef
  addPrivilege() {
    this.router.navigate(['addprivilege']);
  }


  // tslint:disable-next-line:typedef
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.deletePrivilege(id);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
