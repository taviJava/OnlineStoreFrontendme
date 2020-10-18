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
import {UserListComponent} from './users/admcomponents/user-list/user-list.component';
import {UserAddComponent} from './users/admcomponents/user-add/user-add.component';
import {UserEditComponent} from './users/admcomponents/user-edit/user-edit.component';
import {LoginComponent} from './users/admcomponents/login/login.component';
import {AuthGuardService} from './users/service/auth-guard.service';
import {RoleComponent} from './security/admcomponents/role/role.component';
import {PrivilegeComponent} from './security/admcomponents/privilege/privilege.component';
import {AddRoleComponent} from './security/admcomponents/add-role/add-role.component';
import {AddPrivilegeComponent} from './security/admcomponents/add-privilege/add-privilege.component';
import {RolePrivilegeComponent} from './security/admcomponents/role-privilege/role-privilege.component';
import {RoleUserComponent} from './security/admcomponents/role-user/role-user.component';
import {AuthenticationService} from './users/service/authentication.service';
import {AuthGuard2Service} from './users/service/auth-guard2.service';

const routes: Routes = [{path: 'products', component: ProductListComponent, canActivate: [AuthGuard2Service]},
  {path: 'addProduct', component: ProductAddComponent, canActivate: [AuthGuard2Service]},
  {path: 'editProduct/:id', component: ProductEditComponent, canActivate: [AuthGuardService]},
  {path: 'addCategory', component: AddCategoryComponent, canActivate: [AuthGuard2Service]},
  {path: 'categories', component: CategoryListComponent, canActivate: [AuthGuardService]},
  {path: 'subcategories', component: SubcategoryComponent, canActivate: [AuthGuardService]},
  {path: 'addsubcategory', component: SubcategoryAddComponent, canActivate: [AuthGuardService]},
  {path: 'manufacturers', component: ManufacturerListComponent, canActivate: [AuthGuardService]},
  {path: 'addManufacturer', component: AddManufacturerComponent, canActivate: [AuthGuardService]},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuardService]},
  {path: 'addUser', component: UserAddComponent, canActivate: [AuthGuardService]},
  {path: 'editUser/:id', component: UserEditComponent, canActivate: [AuthGuardService]},
  {path: 'roles', component: RoleComponent, canActivate: [AuthGuardService]},
  {path: 'privileges', component: PrivilegeComponent, canActivate: [AuthGuardService]},
  {path: 'addrole', component: AddRoleComponent, canActivate: [AuthGuardService]},
  {path: 'addprivilege', component: AddPrivilegeComponent, canActivate: [AuthGuardService]},
  {path: 'roleprivileges/:id', component: RolePrivilegeComponent, canActivate: [AuthGuardService]},
  {path: 'roleusers/:id', component: RoleUserComponent, canActivate: [AuthGuardService]},
{path: 'login', component: LoginComponent},
{path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
