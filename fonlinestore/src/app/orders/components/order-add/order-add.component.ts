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
              ) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  add(username: string){
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
  addNewOrder(username: string){
    if (this.isLoggedIn()){ // se intampla doar daca userul este logat
      if (this.verifyIfUserOrderExist(username)){  // daca nu exista un order al userului deja creat intro sesiune anteriara
      this.order.username = username;
      this.orderService.saveBegin(this.order); // creaza un order initial
  }else if (this.verifyIfUserHavePendingOrder(username)){  // daca userul are doar cosuri finalizate i se creaza un cos nou gol
      this.order.username = username;
      this.orderService.saveBegin(this.order);
    }else if (this.orders.length === 0){ // adaugare primul utilizator fiindca daca nu am orderuri for ul de mai jos nu ruleaza
      this.order.username = username;
      this.orderService.saveBegin(this.order);
    }
}
  }
  verifyIfUserOrderExist(username: string): boolean{
    for (const order of this.orders){
      if (order.username !== username){
        return true;
      }
      }
    return false;
  }
  verifyIfUserHavePendingOrder(username: string): boolean{
    for (const order of this.orders){
      if (order.username === username && order.status === 'completed'){
        return true;
      }
    }
    return false;
  }

  userLoggedIn(): User{
    return this.authService.returnUser(); // obtine userul logat
  }
}
