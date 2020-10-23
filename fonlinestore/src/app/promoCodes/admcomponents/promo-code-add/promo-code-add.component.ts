import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PromoCodeService} from '../../service/promo-code.service';
import {PromoCode} from '../../model/promo-code';

@Component({
  selector: 'app-promo-code-add',
  templateUrl: './promo-code-add.component.html',
  styleUrls: ['./promo-code-add.component.css']
})
export class PromoCodeAddComponent implements OnInit {
  promoCode: PromoCode = new PromoCode();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private promoCodeService: PromoCodeService) {
  }

  ngOnInit(): void {
    this.promoCode = new PromoCode();
  }
// tslint:disable-next-line:typedef
  getAll() {
    this.router.navigate(['promoCode']);
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.promoCodeService.save(this.promoCode).subscribe(result => this.getAll());
  }
}
