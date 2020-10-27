import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../orders/service/order.service';
import {User} from '../../../users/model/user';
import {AuthenticationService} from '../../../users/service/authentication.service';
import {Orderline} from '../../../orders/model/orderline';
import {Order} from '../../../orders/model/order';
import {MenuAppComponent} from '../../../common/menu-app/menu-app.component';
import {Category} from '../../../categories/model/category';
import {CategoryService} from '../../../categories/service/category.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  id: number;
  product: Product = new Product();
  orederLine: Orderline = new Orderline();
  currentUser: User = new User();
  isLoggedIn = false;
  order: Order = new Order();
  categories: Category[];
  isCollapsed = true;
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private authService: AuthenticationService,
              private catService: CategoryService) { }

  ngOnInit(): void {
    this.order = new Order();
    this.order.orderLines = [];
    this.orederLine = new Orderline();
    this.id = this.route.snapshot.params.id;
    this.productService.getById(this.id).subscribe(data => {
      this.product = new Product();
      this.product = data;
      this.product.photo = this.productService.getPhotos(this.id);
    });
    this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.currentUser = new User();
      if (this.isLoggedIn) {
        this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
        if (this.currentUser === null) {
          this.currentUser = new User();
        }
      }
    });
    this.chargeCart();
    this.categories = [];
    this.catService.findAll().subscribe(data => {
      this.categories = [];
      this.categories = data;
    });
  }

  // tslint:disable-next-line:typedef
  addToCart(username: string, id: number){
    this.orderService.save(username, id, this.orederLine).subscribe(data => {
      this.chargeCart();
      this.ngOnInit();
    });
  }


// tslint:disable-next-line:typedef
  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
  login(): boolean{
    return this.authService.isLoggedIn.getValue();
  }
  isLogout(): boolean{
    return this.login() !== true;
  }

  hasPrivilege(): boolean {
    return this.authService.hasPrivilege();
  }
  // tslint:disable-next-line:typedef
  chargeCart(){
    this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
    this.orderService.getByUserName(this.currentUser.email).subscribe(data => {
      this.order = new Order();
      this.order = data;
      for (const ordLn of this.order.orderLines){
        ordLn.product.photo = this.productService.getPhotos(ordLn.product.id);
      }
    });
  }
  // tslint:disable-next-line:typedef
  viewOrder(id: number){
    this.router.navigate(['viewOrder/' + id]);
  }
  // tslint:disable-next-line:typedef
  backToProducts(){
    this.router.navigate(['productsSt']);
  }
}
