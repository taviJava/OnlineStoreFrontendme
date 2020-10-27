import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {OrderAddComponent} from '../../../orders/components/order-add/order-add.component';
import {OrderService} from '../../../orders/service/order.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  public addOrder: OrderAddComponent = new OrderAddComponent(this.orderService, this.route, this.router, this.authenticationService);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private orderService: OrderService
   ) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  handleLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      setTimeout(() =>
        {
          this.addNewOrder(this.username);
          this.router.navigate(['aboutUs']);
        },
        1500);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
  // tslint:disable-next-line:typedef
  goToRegister(){
    this.router.navigate(['addUser']);
  }
  // tslint:disable-next-line:typedef
  addNewOrder(username: string){
    this.addOrder.add(username);
  }

}
