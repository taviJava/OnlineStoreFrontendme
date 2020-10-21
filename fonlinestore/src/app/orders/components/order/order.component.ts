import { Component, OnInit } from '@angular/core';
import {Order} from '../../model/order';
import {ProductService} from '../../../products/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../service/order.service';
import {Orderline} from '../../model/orderline';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  id: number;
  order: Order = new Order();
  myGroup: FormGroup;
  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.orderService.getById(this.id).subscribe(data => {
      this.order = new Order();
      this.order = data;
      for (const ordLn of this.order.orderLines){
        ordLn.product.photo = this.productService.getPhotos(ordLn.product.id);
      }
    });
  }
// tslint:disable-next-line:typedef
updateQuantity(quant: number, idOrdLn: number, ordLn: Orderline){
    this.orderService.updateQuantity(quant, idOrdLn, ordLn).subscribe(data => {
      this.ngOnInit();
    });
}

// tslint:disable-next-line:typedef
deleteOrdLn(id: number){
    this.orderService.deleteOrdLn(id).subscribe(data => {
      this.ngOnInit();
    });
}
// tslint:disable-next-line:typedef
goToShopping(){
  this.router.navigate(['']);
}
}
