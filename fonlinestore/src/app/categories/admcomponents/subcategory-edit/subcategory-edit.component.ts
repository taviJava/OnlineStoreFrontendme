import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-subcategory-edit',
  templateUrl: './subcategory-edit.component.html',
  styleUrls: ['./subcategory-edit.component.css']
})
export class SubcategoryEditComponent implements OnInit {
  subcategory: Category = new Category();
  dropdownSettings: IDropdownSettings = {};
  categories: Category[] = [];
  selectedCategories: Category[];
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryservice: CategoryService) {
  }

  ngOnInit(): void {
    this.subcategory = new Category();
    this.categories = [];
    this.categoryservice.findAll().subscribe(data => {
      this.categories = [];
      this.categories = data;
    });
    this.selectedCategories = [];
    this.id = this.route.snapshot.params.id;
    this.categoryservice.getById(this.id).subscribe(data => {
      this.subcategory = new Category();
      this.subcategory = data;
      this.selectedCategories = [];
      this.selectedCategories.push(this.subcategory.parent);
    });
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
  onSubmit() {
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
