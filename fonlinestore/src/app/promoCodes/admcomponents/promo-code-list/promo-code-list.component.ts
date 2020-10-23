import {Component, OnInit} from '@angular/core';
import {PromoCode} from '../../model/promo-code';
import {ActivatedRoute, Router} from '@angular/router';
import {PromoCodeService} from '../../service/promo-code.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-promo-code-list',
  templateUrl: './promo-code-list.component.html',
  styleUrls: ['./promo-code-list.component.css']
})
export class PromoCodeListComponent implements OnInit {
  promoCode: PromoCode [];
  closeResult = '';
  searchValue = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private  promoCodeService: PromoCodeService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.promoCode = [];
    this.getAll();
  }

  // tslint:disable-next-line:typedef
  getAll() {
    this.promoCodeService.findAll().subscribe(data => {
      this.promoCode = [];
      this.promoCode = data;
    });
  }

  // tslint:disable-next-line:typedef
  add() {
    this.router.navigate(['addPromoCode']);
  }

  // tslint:disable-next-line:typedef
  edit(id: number) {
    this.router.navigate(['editPromoCode/' + id]);
  }

  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.promoCodeService.delete(id).subscribe(data => {
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
}
