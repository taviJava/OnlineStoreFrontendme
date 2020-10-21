import { Component, OnInit } from '@angular/core';
import {Order} from '../../model/order';
import {OrderService} from '../../service/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../users/service/authentication.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../../users/model/user';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  order: Order = new Order();
  orders: Order[] = [];
  user: User = new User();

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  add(username: string) {
    this.orderService.findAll().subscribe(data => {
      this.orders = [];
      this.orders = data;
    });
    this.addNewOrder(username);
  }

  isLoggedIn(): BehaviorSubject<boolean> {  // verifica daca userul este logat
    return this.authService.isLoggedIn;
  }

  // tslint:disable-next-line:typedef
  addNewOrder(username: string) {
    if (this.isLoggedIn()) {
      this.order.username = username;
      this.orderService.saveBegin(this.order).subscribe();
    }
  }
}
