import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryListComponent } from './categories/admcomponents/category-list/category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {NgSelectModule} from '@ng-select/ng-select';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCategoryComponent } from './categories/admcomponents/add-category/add-category.component';
import { ProductListComponent } from './products/admcomponents/product-list/product-list.component';
import { ProductAddComponent } from './products/admcomponents/product-add/product-add.component';
import { ProductEditComponent } from './products/admcomponents/product-edit/product-edit.component';
import {NgModule} from '@angular/core';
import { MenuAppComponent } from './common/menu-app/menu-app.component';
import {   } from 'angular-bootstrap-md';
import { SubcategoryComponent } from './categories/admcomponents/subcategory/subcategory.component';
import { SubcategoryAddComponent } from './categories/admcomponents/subcategory-add/subcategory-add.component';
import { ManufacturerListComponent } from './manufacturers/admcomponents/manufacturer-list/manufacturer-list.component';
import { AddManufacturerComponent } from './manufacturers/admcomponents/add-manufacturer/add-manufacturer.component';





@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    AddCategoryComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    MenuAppComponent,
    SubcategoryComponent,
    SubcategoryAddComponent,
    ManufacturerListComponent,
    AddManufacturerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    BrowserModule, Ng2SearchPipeModule,
    BrowserModule, NgxPaginationModule, BrowserAnimationsModule,
    CarouselModule, WavesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
