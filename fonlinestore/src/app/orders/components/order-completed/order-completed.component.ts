import { Component, OnInit } from '@angular/core';
import {Order} from '../../model/order';
import {OrderService} from '../../service/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../products/services/product.service';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.css']
})
export class OrderCompletedComponent implements OnInit {
  id: number;
  order: Order = new Order();
  updateGroup: FormGroup;
  promoGroup: FormGroup;
  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.order.orderLines = [];
    this.orderService.getById(this.id).subscribe(data => {
      this.order = new Order();
      this.order.orderLines = [];
      this.order = data;
      for (const ordLn of this.order.orderLines){
        ordLn.product.photo = this.productService.getPhotos(ordLn.product.id);
        this.updateGroup = new FormGroup( {
          updateQ : new FormControl(ordLn.productsQuantity)
        });
      }
      this.promoGroup = new FormGroup( {
        promo : new FormControl(this.order.promoCode.code)
      });
    });
  }

// tslint:disable-next-line:typedef
  goToShopping(){
    this.router.navigate(['productsSt']);
  }
  ifIsPending(): boolean{
    if (this.order.status === 'pending'){
      return true;
    }
    return false;
  }
  retTrue(): boolean{
    return true;
  }
}
