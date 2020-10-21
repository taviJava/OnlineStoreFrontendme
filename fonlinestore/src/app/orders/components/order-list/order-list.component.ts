import { Component, OnInit } from '@angular/core';
import {Order} from '../../model/order';
import {ProductService} from '../../../products/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  searchValue = '';
  p = 1;
  numberOfItemsPerP = 10;
  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.orders = [];
    this.orderService.findAll().subscribe(data => {
      this.orders = [];
      this.orders = data;
    });
  }

  // tslint:disable-next-line:typedef
  viewOrder(id: number){
    this.router.navigate(['viewOrder/' + id]);
  }

}
