import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../service/category.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  allCategories: Category[] = [];
  closeResult = '';
  searchValue = '';
  constructor(private categoryservice: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAll();
  }
// tslint:disable-next-line:typedef
  getAll() {
    this.categoryservice.findAll().subscribe(data => {
      this.categories = [];
      this.allCategories = [];
      this.allCategories = data;
      for (const category of this.allCategories){
        if (category.parent === null){
          this.categories.push(category);
        }
      }
    });
  }
  // tslint:disable-next-line:typedef
  add(){
    this.router.navigate(['addCategory']);
  }
  // tslint:disable-next-line:typedef
  editContinent(id: number) {
    this.router.navigate(['editCategory/' + id]);
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
