import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './products/admcomponents/product-list/product-list.component';
import { ProductAddComponent } from './products/admcomponents/product-add/product-add.component';
import { ProductEditComponent } from './products/admcomponents/product-edit/product-edit.component';
import {AddCategoryComponent} from './categories/admcomponents/add-category/add-category.component';
import {CategoryListComponent} from './categories/admcomponents/category-list/category-list.component';

const routes: Routes = [{path: 'products', component: ProductListComponent},
  {path: 'addProduct', component: ProductAddComponent},
  {path: 'editProduct', component: ProductEditComponent},
  {path: 'addCategory', component: AddCategoryComponent},
  {path: 'categories', component: CategoryListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
