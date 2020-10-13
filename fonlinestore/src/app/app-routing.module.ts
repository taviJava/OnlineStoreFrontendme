import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './products/admcomponents/product-list/product-list.component';
import { ProductAddComponent } from './products/admcomponents/product-add/product-add.component';
import { ProductEditComponent } from './products/admcomponents/product-edit/product-edit.component';
import {AddCategoryComponent} from './categories/admcomponents/add-category/add-category.component';
import {CategoryListComponent} from './categories/admcomponents/category-list/category-list.component';
import {SubcategoryComponent} from './categories/admcomponents/subcategory/subcategory.component';
import {SubcategoryAddComponent} from './categories/admcomponents/subcategory-add/subcategory-add.component';
import {ManufacturerListComponent} from './manufacturers/admcomponents/manufacturer-list/manufacturer-list.component';
import {AddManufacturerComponent} from './manufacturers/admcomponents/add-manufacturer/add-manufacturer.component';
import {AddressListComponent} from './address/admcomponents/address-list/address-list.component';
import {AddressAddComponent} from './address/admcomponents/address-add/address-add.component';
import {AddressEditComponent} from './address/admcomponents/address-edit/address-edit.component';
import {UserListComponent} from './users/admcomponents/user-list/user-list.component';
import {UserAddComponent} from './users/admcomponents/user-add/user-add.component';
import {UserEditComponent} from './users/admcomponents/user-edit/user-edit.component';

const routes: Routes = [{path: 'products', component: ProductListComponent},
  {path: 'addProduct', component: ProductAddComponent},
  {path: 'editProduct', component: ProductEditComponent},
  {path: 'addCategory', component: AddCategoryComponent},
  {path: 'categories', component: CategoryListComponent},
  {path: 'subcategories', component: SubcategoryComponent},
  {path: 'addsubcategory', component: SubcategoryAddComponent},
  {path: 'manufacturers', component: ManufacturerListComponent},
  {path: 'addManufacturer', component: AddManufacturerComponent},
  {path: 'address', component: AddressListComponent},
  {path: 'addAddress', component: AddressAddComponent},
  {path: 'editAddress/:id', component: AddressEditComponent},
  {path: 'users', component: UserListComponent},
  {path: 'addUser', component: UserAddComponent},
  {path: 'editUser/:id', component: UserEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
