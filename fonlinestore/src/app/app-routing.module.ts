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
import {ProductsComponent} from './products/components/products/products.component';
import {ProductViewComponent} from './products/components/product-view/product-view.component';
import {OrderListComponent} from './orders/components/order-list/order-list.component';
import {OrderAddComponent} from './orders/components/order-add/order-add.component';
import {OrderComponent} from './orders/components/order/order.component';
import {TestComponent} from './test/componets/test/test.component';
import {MenuAppComponent} from './common/menu-app/menu-app.component';
import {ProductsCatComponent} from './products/components/products-cat/products-cat.component';

const routes: Routes = [{path: 'products', component: ProductListComponent, canActivate: [AuthGuard2Service]},
  {path: 'addProduct', component: ProductAddComponent, canActivate: [AuthGuard2Service]},
  {path: 'editProduct/:id', component: ProductEditComponent, canActivate: [AuthGuard2Service]},
  {path: 'addCategory', component: AddCategoryComponent, canActivate: [AuthGuard2Service]},
  {path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard2Service]},
  {path: 'subcategories', component: SubcategoryComponent, canActivate: [AuthGuard2Service]},
  {path: 'addsubcategory', component: SubcategoryAddComponent, canActivate: [AuthGuard2Service]},
  {path: 'manufacturers', component: ManufacturerListComponent, canActivate: [AuthGuard2Service]},
  {path: 'addManufacturer', component: AddManufacturerComponent, canActivate: [AuthGuard2Service]},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard2Service]},
  {path: 'addUser', component: UserAddComponent},
  {path: 'editUser/:id', component: UserEditComponent, canActivate: [AuthGuard2Service]},
  {path: 'roles', component: RoleComponent, canActivate: [AuthGuard2Service]},
  {path: 'privileges', component: PrivilegeComponent, canActivate: [AuthGuard2Service]},
  {path: 'addrole', component: AddRoleComponent, canActivate: [AuthGuard2Service]},
  {path: 'addprivilege', component: AddPrivilegeComponent, canActivate: [AuthGuard2Service]},
  {path: 'roleprivileges/:id', component: RolePrivilegeComponent, canActivate: [AuthGuard2Service]},
  {path: 'roleusers/:id', component: RoleUserComponent, canActivate: [AuthGuard2Service]},
  {path: 'editCategory/:id', component: AddCategoryComponent, canActivate: [AuthGuard2Service]},
  {path: 'editsubcategory/:id', component: AddCategoryComponent, canActivate: [AuthGuard2Service]},
  {path: 'orders', component: OrderListComponent, canActivate: [AuthGuard2Service]},
  {path: 'viewProduct/:id', component: ProductViewComponent , canActivate: [AuthGuardService]},
  {path: 'viewOrder/:id', component: OrderComponent , canActivate: [AuthGuardService]},
{path: 'login', component: LoginComponent},
  {path: 'login', component: OrderAddComponent},
  {path: '', component: LoginComponent},
  {path: 'productsSt', component: ProductsComponent, canActivate: [AuthGuardService]},
  {path: 'test', component: TestComponent},
  {path: 'productsCat/:id', component: ProductsCatComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
