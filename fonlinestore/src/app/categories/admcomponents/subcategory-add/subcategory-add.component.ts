import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-subcategory-add',
  templateUrl: './subcategory-add.component.html',
  styleUrls: ['./subcategory-add.component.css']
})
export class SubcategoryAddComponent implements OnInit {
  subcategory: Category = new Category();
  dropdownSettings: IDropdownSettings = {};
  categories: Category[];
  selectedCategories: Category[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryservice: CategoryService) { }

  ngOnInit(): void {
    this.categories = [];
    this.selectedCategories = [];
    this.categoryservice.findAll().subscribe(data => {
      this.categories = [];
      this.categories = data; });
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
// tslint:disable-next-line:typedef
  getAll() {
    this.router.navigate(['subcategories']);
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.subcategory.parent = this.selectedCategories[0];
    this.categoryservice.save(this.subcategory).subscribe(result => this.getAll());
  }

  // tslint:disable-next-line:typedef
  onItemSelect(item: any) {
    console.log(item);
  }

  // tslint:disable-next-line:typedef
  onSelectAll(items: any) {
    console.log(items);
  }
}
