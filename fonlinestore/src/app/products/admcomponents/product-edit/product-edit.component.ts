import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../categories/service/category.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {Category} from '../../../categories/model/category';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = new Product();
  id: number;
  dropdownSettings: IDropdownSettings = {};
  category: Category[];
  selectedCategory: Category[];
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.category = [];
    this.id = this.route.snapshot.params.id;
    this.productService.getById(this.id).subscribe(data => {
      this.product = new Product();
      this.selectedCategory = [];
      this.product = data;
      this.selectedCategory.push(this.product.category);
    });
    this.categoryService.findAll().subscribe(data => this.category = data);
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
  gotoList() {
    this.router.navigate(['products']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.product.category = this.selectedCategory[0];
    this.productService.update(this.product).subscribe(result => this.gotoList());
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
