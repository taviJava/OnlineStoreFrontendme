import { Component, OnInit } from '@angular/core';
import {Order} from '../../model/order';
import {ProductService} from '../../../products/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../service/order.service';
import {Orderline} from '../../model/orderline';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../../users/model/user';
import {AuthenticationService} from '../../../users/service/authentication.service';
import {Category} from '../../../categories/model/category';
import {CategoryService} from '../../../categories/service/category.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  id: number;
  order: Order = new Order();
  myGroup: FormGroup;
  // de aici pt nav bar
  isLoggedIn = false;
  currentUser: User;
  categories: Category[];
  promoCode = 'Promo Code';
  closeResult = '';
  orderNew = new Order();
  deliveryAddress: string;
  comment = 'Write a comment';
  commentGroup: FormGroup;
  isCollapsed = true;
  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private authService: AuthenticationService,
              private catService: CategoryService,
              private modalService: NgbModal) { this.currentUser = new User();
                                                this.currentUser.email = 'Please Log-in'; }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.orderService.getById(this.id).subscribe(data => {
      this.order = new Order();
      this.order = data;
      for (const ordLn of this.order.orderLines){
        ordLn.product.photo = this.productService.getPhotos(ordLn.product.id);
      }
    });
    // de aici navbar
    this.order = new Order();
    this.order.orderLines = [];
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
    this.myGroup = new FormGroup({
      street: new FormControl(this.currentUser.adress.street),
      city: new FormControl(this.currentUser.adress.city),
      country: new FormControl(this.currentUser.adress.country),
      zipcode: new FormControl(this.currentUser.adress.zipCode),
      phoneNumber: new FormControl(2)
    });
    this.commentGroup = new FormGroup({
      comment: new FormControl(this.comment)
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
  this.router.navigate(['productsSt']);
}
// de aici navbar

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
  purchase(){
    this.order.deliveryAddress = this.getAddress();
    console.log(this.order.deliveryAddress);
    const comment = this.commentGroup.get('comment').value;
    this.orderService.update(this.order, this.order.id, this.order.deliveryAddress, comment).subscribe(data =>
    {
      setTimeout(() =>
        {
          this.orderNew = new Order();
          this.orderNew.username = this.currentUser.email;
          this.orderService.saveBegin(this.orderNew).subscribe();
          this.router.navigate(['productsSt']);
        },
        2000);
    });
  }
  // tslint:disable-next-line:typedef
  applyPromo(code: string, orderId: number){
    this.orderService.getPromoCode(code, orderId, this.order).subscribe(data => {
      this.ngOnInit();
    });
  }
  // tslint:disable-next-line:typedef
  open(content ) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.purchase();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getAddress(): string{
     this.deliveryAddress = 'County: ' + this.myGroup.get('country').value + 'City: ' +
       this.myGroup.get('city').value + 'Street: ' + this.myGroup.get('street').value +
       'Zip Code: ' + this.myGroup.get('zipcode').value + 'Phone Number: ' + this.myGroup.get('phoneNumber').value;
     return this.deliveryAddress;
  }
  ifIsPending(): boolean{
    if (this.order.status === 'pending'){
      return true;
    }
    return false;
  }

}
