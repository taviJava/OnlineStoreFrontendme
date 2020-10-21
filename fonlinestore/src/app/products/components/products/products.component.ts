import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderService} from '../../../orders/service/order.service';
import {Ordermodel} from '../../../orders/model2/ordermodel';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  order: Ordermodel = new Ordermodel();
  product: Product[] = [];
  closeResult = '';
  searchValue = '';
  p = 1;            // pt paginare si urmatoarea la fel
  numberOfItemsPerP = 10;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private ordService: OrderService) {
  }

  ngOnInit(): void {
    this.getAll();
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

}
