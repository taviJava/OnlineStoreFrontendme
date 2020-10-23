import {Component, OnInit} from '@angular/core';
import {PromoCode} from '../../model/promo-code';
import {ActivatedRoute, Router} from '@angular/router';
import {PromoCodeService} from '../../service/promo-code.service';

@Component({
  selector: 'app-promo-code-edit',
  templateUrl: './promo-code-edit.component.html',
  styleUrls: ['./promo-code-edit.component.css']
})
export class PromoCodeEditComponent implements OnInit {
  promoCode: PromoCode = new PromoCode();
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private promoCodeService: PromoCodeService) {
  }

  ngOnInit(): void {
    this.promoCode = new PromoCode();
    this.id = this.route.snapshot.params.id;
    this.promoCodeService.getById(this.id).subscribe(data => {
      this.promoCode = data;
    });
  }

  // tslint:disable-next-line:typedef
  gotoList() {
    this.router.navigate(['promoCode']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.promoCodeService.update(this.promoCode).subscribe(result => this.gotoList());
  }
}
