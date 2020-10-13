import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  subcategories: Category[];
  categories: Category[] = [];
  closeResult = '';
  searchValue = '';
  constructor(private categoryservice: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.categories = [];
    this.subcategories = [];
    this.getAll();
  }
// tslint:disable-next-line:typedef
  getAll() {
   this.categoryservice.findSub().subscribe(data => {
     this.subcategories = [];
     this.subcategories = data;
   });
  }
  // tslint:disable-next-line:typedef
  add(){
    this.router.navigate(['addsubcategory']);
  }
  // tslint:disable-next-line:typedef
  edit(id: number) {
    this.router.navigate(['editsubcategory/' + id]);
  }
  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.categoryservice.delete(id).subscribe(data => {
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

}
