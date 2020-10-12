import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    AddCategoryComponent
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
