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
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  // preview photo
  fileData: File = null;
  previewUrl: any = null;
  uploadedFilePath: string = null;
  // form
  myGroup: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService,
              private manufacturerService: ManufacturerService) {
  }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(),
      productType: new FormControl(),
      price: new FormControl(),
      selectedCategory: new FormControl(),
      selectedManufacturer: new FormControl()
    });
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
  formCompleted(): boolean{
    const name: string = this.myGroup.get('name').value;
    const description: string = this.myGroup.get('description').value;
    const price: string = this.myGroup.get('price').value;
    const productType: any = this.myGroup.get('productType').value;
    const selectedCategory: any = this.myGroup.get('selectedCategory').value;
    const selectedManufacturer: any = this.myGroup.get('selectedManufacturer').value;
    if (name !== '' && description !== '' && price && productType !== null && selectedCategory !== null && selectedManufacturer !== null){
      if (this.previewUrl){
        return true;
      }
    }
    return false;
  }

  // tslint:disable-next-line:typedef
  getList() {
    this.router.navigate(['products']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.product.name = this.myGroup.get('name').value;
    this.product.description = this.myGroup.get('description').value;
    this.product.price = this.myGroup.get('price').value;
    this.product.productType = this.myGroup.get('productType').value;
    this.selectedCategory = this.myGroup.get('selectedCategory').value;
    this.selectedManufacturer = this.myGroup.get('selectedManufacturer').value;
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
  // tslint:disable-next-line:typedef
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.fileProgress(event);
  }
  // tslint:disable-next-line:typedef
  fileProgress(fileInput: any) {
    this.fileData = (fileInput.target.files[0] as File);
    this.preview();
  }

  // tslint:disable-next-line:typedef
  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }
}
