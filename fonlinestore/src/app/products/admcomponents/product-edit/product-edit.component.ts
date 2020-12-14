import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../categories/service/category.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {Category} from '../../../categories/model/category';
import {FormControl, FormGroup} from '@angular/forms';
import {Manufacturer} from '../../../manufacturers/model/manufacturer';
import {ManufacturerService} from '../../../manufacturers/service/manufacturer.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = new Product();
  id: number;
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
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private manufacturerService: ManufacturerService) {
  }

  ngOnInit(): void {
    this.category = [];
    this.selectedCategory = [];
    this.selectedManufacturer = [];
    this.producttypes = [];
    this.id = this.route.snapshot.params.id;
    this.productService.getById(this.id).subscribe(product => {
      this.product = new Product();
      this.selectedCategory = [];
      this.selectedManufacturer = [];
      this.product = product;
      this.product.photo = this.getPhoto(this.id);
      this.selectedCategory.push(this.product.category);
      this.selectedManufacturer.push(this.product.manufacturer);
      this.producttypes.push(this.product.productType);
    });

    this.producttypes.push('piece');
    this.producttypes.push('perKg');
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
  gotoList() {
    this.router.navigate(['products']);
  }
  // tslint:disable-next-line:typedef
  getPhoto(id: number){
   return  this.productService.getPhotos(id);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.product.manufacturer = this.selectedManufacturer[0];
    this.product.category = this.selectedCategory[0];
    console.log(this.product);
    this.productService.update(this.product).subscribe(// result => this.gotoList()
     );
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
    this.productService.uploadUpdate(this.currentFile, this.id).subscribe(
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
  formCompleted(): boolean{
    const name: string = this.myGroup.get('name').value;
    const description: string = this.myGroup.get('description').value;
    const price: string = this.myGroup.get('price').value;
    const productType: any = this.myGroup.get('productType').value;
    const selectedCategory: any = this.myGroup.get('selectedCategory').value;
    const selectedManufacturer: any = this.myGroup.get('selectedManufacturer').value;
    if (name !== '' && description !== '' && price && productType !== null && selectedCategory !== null && selectedManufacturer !== null){
        return false;
    }
    return true;
  }
  // tslint:disable-next-line:typedef
  changePhoto(){
    this.productService.deletePhoto(this.product.idPhoto).subscribe(data => {
      this.upload();
    });
    setTimeout(() =>
      {
        this.gotoList();
      },
      4000);
  }
}
