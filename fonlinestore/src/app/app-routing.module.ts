import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './categories/admcomponents/category-list/category-list.component';
import { AddCategoryComponent } from './categories/admcomponents/add-category/add-category.component';

const routes: Routes = [{path: 'categoryadm', component: CategoryListComponent},
  {path: 'addcategoryadm', component: AddCategoryComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
