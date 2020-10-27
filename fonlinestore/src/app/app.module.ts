import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {UserAddComponent} from './users/admcomponents/user-add/user-add.component';
import {UserEditComponent} from './users/admcomponents/user-edit/user-edit.component';
import {UserListComponent} from './users/admcomponents/user-list/user-list.component';
import { LoginComponent } from './users/admcomponents/login/login.component';
import {UserService} from './users/service/user.service';
import {HttpInterceptorService} from './users/service/http-interceptor.service';
import {CategoryEditComponent} from './categories/admcomponents/category-edit/category-edit.component';
import {SubcategoryEditComponent} from './categories/admcomponents/subcategory-edit/subcategory-edit.component';
import { ProductsComponent } from './products/components/products/products.component';
import { ProductViewComponent } from './products/components/product-view/product-view.component';
import { OrderComponent } from './orders/components/order/order.component';
import { OrderListComponent } from './orders/components/order-list/order-list.component';
import { OrderAddComponent } from './orders/components/order-add/order-add.component';
import { TestComponent } from './test/componets/test/test.component';
import { ProductsCatComponent } from './products/components/products-cat/products-cat.component';
import {ManufacturerEditComponent} from './manufacturers/admcomponents/manufacturer-edit/manufacturer-edit.component';
import { PromoCodeAddComponent } from './promoCodes/admcomponents/promo-code-add/promo-code-add.component';
import { PromoCodeEditComponent } from './promoCodes/admcomponents/promo-code-edit/promo-code-edit.component';
import {PromoCodeListComponent} from './promoCodes/admcomponents/promo-code-list/promo-code-list.component';
import { RoleUsersComponent } from './users/admcomponents/role-users/role-users.component';
import { AboutUsComponent } from './common/aboutus/about-us/about-us.component';
import { UserProfileComponent } from './users/componets/user-profile/user-profile.component';
import { UserOrdersComponent } from './orders/components/user-orders/user-orders.component';
import { OrderCompletedComponent } from './orders/components/order-completed/order-completed.component';
import { ChangePhotoComponent } from './users/components/change-photo/change-photo.component';



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
    UserAddComponent,
    UserEditComponent,
    UserListComponent,
    LoginComponent,
    CategoryEditComponent,
    SubcategoryEditComponent,
    ProductsComponent,
    ProductViewComponent,
    OrderComponent,
    OrderListComponent,
    OrderAddComponent,
    TestComponent,
    ProductsCatComponent,
    ManufacturerEditComponent,
    PromoCodeListComponent,
    PromoCodeAddComponent,
   PromoCodeEditComponent,
   RoleUsersComponent,
   AboutUsComponent,
   UserProfileComponent,
   UserOrdersComponent,
   OrderCompletedComponent,
   ChangePhotoComponent,
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
  providers: [UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
