import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent} from './products/admcomponents/product-list/product-list.component';
import {ProductAddComponent} from './products/admcomponents/product-add/product-add.component';
import {ProductEditComponent} from './products/admcomponents/product-edit/product-edit.component';
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
import {AuthGuard2Service} from './users/service/auth-guard2.service';
import {ProductsComponent} from './products/components/products/products.component';
import {ProductViewComponent} from './products/components/product-view/product-view.component';
import {OrderListComponent} from './orders/components/order-list/order-list.component';
import {OrderAddComponent} from './orders/components/order-add/order-add.component';
import {OrderComponent} from './orders/components/order/order.component';
import {TestComponent} from './test/componets/test/test.component';
import {ProductsCatComponent} from './products/components/products-cat/products-cat.component';
import {ManufacturerEditComponent} from './manufacturers/admcomponents/manufacturer-edit/manufacturer-edit.component';
import {PromoCodeListComponent} from './promoCodes/admcomponents/promo-code-list/promo-code-list.component';
import {PromoCodeAddComponent} from './promoCodes/admcomponents/promo-code-add/promo-code-add.component';
import {PromoCodeEditComponent} from './promoCodes/admcomponents/promo-code-edit/promo-code-edit.component';
import {RoleUsersComponent} from './users/admcomponents/role-users/role-users.component';
import {UserProfileComponent} from './users/componets/user-profile/user-profile.component';
import {UserOrdersComponent} from './orders/components/user-orders/user-orders.component';
import {OrderCompletedComponent} from './orders/components/order-completed/order-completed.component';
import {AboutUsComponent} from './common/aboutus/about-us/about-us.component';
import {ChangePhotoComponent} from './users/components/change-photo/change-photo.component';

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
  {path: 'roleusers/:id', component: RoleUsersComponent, canActivate: [AuthGuard2Service]},
  {path: 'addUser', component: UserAddComponent},
  {path: 'editUser/:id', component: UserEditComponent, canActivate: [AuthGuard2Service]},
  {path: 'editCategory/:id', component: AddCategoryComponent, canActivate: [AuthGuard2Service]},
  {path: 'editsubcategory/:id', component: AddCategoryComponent, canActivate: [AuthGuard2Service]},
  {path: 'orders', component: OrderListComponent, canActivate: [AuthGuard2Service]},
  {path: 'viewProduct/:id', component: ProductViewComponent, canActivate: [AuthGuardService]},
  {path: 'viewOrder/:id', component: OrderComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'login', component: OrderAddComponent},
  {path: '', component: LoginComponent},
  {path: 'productsSt', component: ProductsComponent, canActivate: [AuthGuardService]},
  {path: 'test', component: TestComponent},
  {path: 'productsCat/:id', component: ProductsCatComponent, canActivate: [AuthGuardService]},
  {path: 'editManufacturer/:id', component: ManufacturerEditComponent, canActivate: [AuthGuard2Service]},
  {path: 'promoCode', component: PromoCodeListComponent, canActivate: [AuthGuard2Service]},
  {path: 'addPromoCode', component: PromoCodeAddComponent, canActivate: [AuthGuard2Service]},
  {path: 'editPromoCode/:id', component: PromoCodeEditComponent, canActivate: [AuthGuard2Service]},
  {path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard2Service]},
  {path: 'userOrders', component: UserOrdersComponent, canActivate: [AuthGuard2Service]},
  {path: 'orderCompleted/:id', component: OrderCompletedComponent, canActivate: [AuthGuard2Service]},
  {path: 'aboutUs', component: AboutUsComponent, canActivate: [AuthGuardService]},
  {path: 'changePhoto/:id', component: ChangePhotoComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
