import { Component, OnInit } from '@angular/core';
import {User} from '../../users/model/user';
import {AuthenticationService} from '../../users/service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../orders/model/order';
import {OrderService} from '../../orders/service/order.service';
import {ProductService} from '../../products/services/product.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-menu-app',
  templateUrl: './menu-app.component.html',
  styleUrls: ['./menu-app.component.css']
})
export class MenuAppComponent implements OnInit {
  isLoggedIn = false;
  currentUser: User;
  order: Order = new Order();

  constructor(private authService: AuthenticationService,
              private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
    this.currentUser = new User();
    this.currentUser.email = 'Please Log-in';
  }

  ngOnInit(): void {
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
  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
  login(): boolean{
    return this.authService.isLoggedIn.getValue();
  }

  hasPrivilege(): boolean {
    return this.authService.hasPrivilege();
  }
}
