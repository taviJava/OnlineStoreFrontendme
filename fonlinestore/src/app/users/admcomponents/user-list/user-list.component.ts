import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  closeResult = '';
  searchValue = '';
  p = 1;            // pt paginare si urmatoarea la fel
  numberOfItemsPerP = 10;
  photo: Observable<any>;
  value: boolean;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private  userService: UserService) {
  }

  ngOnInit(): void {
    this.getAll();
    this.verifyValue();
  }


  // tslint:disable-next-line:typedef
  getAll() {
    this.userService.findAll().subscribe(data => {
      this.users = [];
      this.users = data;
      for (const user of this.users){
        user.photo = this.getPhoto(user.id);
      }
    });
  }
  getPhoto(id: number): Observable<any>{
    return this.userService.getUserPhoto(id);
  }

  // tslint:disable-next-line:typedef
  add() {
    this.router.navigate(['addUser']);
  }
  // tslint:disable-next-line:typedef
  edit(id: number) {
    this.router.navigate(['editUser/' + id]);
  }

  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.userService.delete(id).subscribe(data => {
      this.getAll();
    });
  }

  // tslint:disable-next-line:typedef
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.delete(id);
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
  verifyValue(): boolean{
if (this.users.length > 0){
  return true;
}else{
  return false;
}
}

// tslint:disable-next-line:typedef
goToRoles(id: number){
    this.router.navigate(['roleusers/' + id]);
}

}
