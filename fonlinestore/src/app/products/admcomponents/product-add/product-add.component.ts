import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';
import {Router, ActivatedRoute} from '@angular/router';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {Category} from '../../../categories/model/category';
import {CategoryService} from '../../../categories/service/category.service';
import {Manufacturer} from '../../../manufacturers/model/manufacturer';
import {ManufacturerService} from '../../../manufacturers/service/manufacturer.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

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
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

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
    this.categoryService.findSub().subscribe(data => {
      this.category = [];
      this.category = data;
    });
    this.manufacturerService.findAll().subscribe(data => {
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
    this.product.category = this.selectedCategory[0];
    this.productService.save(this.product).subscribe(result => {
      this.upload();
      setTimeout(() =>
        {
          this.getList();
        },
        5000);
    });
  }
  // tslint:disable-next-line:typedef
  selectFile(event) {
    this.selectedFiles = event.target.files;
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
  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.productService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          const a = event.body.id;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
  }
}
