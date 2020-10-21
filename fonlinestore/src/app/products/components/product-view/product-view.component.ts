import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../orders/service/order.service';
import {User} from '../../../users/model/user';
import {AuthenticationService} from '../../../users/service/authentication.service';
import {Orderline} from '../../../orders/model/orderline';

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
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
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
  }

  // tslint:disable-next-line:typedef
  addToCart(username: string, id: number){
    this.orderService.save(username, id, this.orederLine).subscribe();
  }

}
