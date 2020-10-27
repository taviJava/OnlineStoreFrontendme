import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderService} from '../../../orders/service/order.service';
import {AuthenticationService} from '../../../users/service/authentication.service';
import {User} from '../../../users/model/user';
import {Order} from '../../../orders/model/order';
import {Category} from '../../../categories/model/category';
import {CategoryService} from '../../../categories/service/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product: Product[] = [];
  closeResult = '';
  searchValue = '';
  p = 1;            // pt paginare si urmatoarea la fel
  numberOfItemsPerP = 10;
  currentUser: User;
  order: Order = new Order();
  isLoggedIn = false;
  categories: Category[];
  isCollapsed = true;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private orderService: OrderService,
              private authService: AuthenticationService,
              private catService: CategoryService
              ) {
  }

  ngOnInit(): void {
    this.order.orderLines = [];
    this.getAll();
    this.chargeCart();

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
    this.categories = [];
    this.catService.findAll().subscribe(data => {
      this.categories = [];
      this.categories = data;
    });
  }

  // tslint:disable-next-line:typedef
  getAll() {
    this.productService.findAll().subscribe(data => {
      this.product = [];
      this.product = data;
      for (const prod of this.product){
        prod.photo = this.productService.getPhotos(prod.id);
      }
    });
  }


  // tslint:disable-next-line:typedef
  addAll() {
    this.router.navigate(['addProduct']);
  }

  // tslint:disable-next-line:typedef
  edit(id: number) {
    this.router.navigate(['editProduct/' + id]);
  }

  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.productService.delete(id).subscribe(data => {
      this.getAll();
    });
  }

  // tslint:disable-next-line:typedef
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.delete(id);
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

  // tslint:disable-next-line:typedef
  viewProduct(id: number){
    this.router.navigate(['viewProduct/' + id]);
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
  viewOrder(id: number){
    this.router.navigate(['viewOrder/' + id]);
  }

}
