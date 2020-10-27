import { Component, OnInit } from '@angular/core';
import {Order} from '../../model/order';
import {OrderService} from '../../service/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../users/model/user';
import {AuthenticationService} from '../../../users/service/authentication.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];
  currentUser: User;
  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService
  ) {this.currentUser = new User(); }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
    this.orders = [];
    this.orderService.findOrdersByUsername(this.currentUser.email).subscribe(data => {
      this.orders = [];
      this.orders = data;
    });
  }

  // tslint:disable-next-line:typedef
  viewOrder(id: number){
    this.router.navigate(['viewOrder/' + id]);
  }
  // tslint:disable-next-line:typedef
  viewOrderCompleted(id: number){
    this.router.navigate(['orderCompleted/' + id]);
  }
  ifIsCompleted(status: string): boolean{
    if (status === 'completed'){
      return true;
    }
    return false;
  }

}
