import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';
import {Router, ActivatedRoute} from '@angular/router';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {Category} from '../../../categories/model/category';
import {CategoryService} from '../../../categories/service/category.service';
import {Manufacturer} from '../../../manufacturers/model/manufacturer';
import {ManufacturerService} from '../../../manufacturers/service/manufacturer.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  product: Product = new Product();
  dropdownSettings: IDropdownSettings = {};
  category: Category[] = [];
  selectedCategory: Category[] = [];
  manufacturers: Manufacturer[] = [];
  selectedManufacturer: Manufacturer[] = [];
  producttypes: string[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService,
              private manufacturerService: ManufacturerService) {
  }

  ngOnInit(): void {
    this.producttypes.push('piece');
    this.producttypes.push('perKg');
    this.category = [];
    this.manufacturers = [];
    this.categoryService.findAll().subscribe(data => {
      this.category = [];
      this.category = data; });
    this.manufacturerService.findAll().subscribe( data => {
      this.manufacturers = [];
      this.manufacturers = data;
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
  getList() {
    this.router.navigate(['products']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.product.manufacturer = this.selectedManufacturer[0];
    this.product.subcategory = this.selectedCategory[0];
    this.productService.save(this.product).subscribe(result => this.getList());
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
