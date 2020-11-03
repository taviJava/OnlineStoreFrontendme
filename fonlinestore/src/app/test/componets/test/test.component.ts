import {Component,  OnInit} from '@angular/core';
import {ProductService} from '../../../products/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderService} from '../../../orders/service/order.service';
import {AuthenticationService} from '../../../users/service/authentication.service';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {OrderAddComponent} from '../../../orders/components/order-add/order-add.component';
import {User} from '../../../users/model/user';
import {FormControl, FormGroup} from '@angular/forms';
import {Address} from '../../../users/model/address';
import {UserService} from '../../../users/service/user.service';
import {Review} from '../../../products/model/review';
import {ReviewService} from '../../../products/services/review.service';




@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  reviews: Review[] = [];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthenticationService,
              private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.reviews = [];
    this.getAll();
  }
  // tslint:disable-next-line:typedef
  getAll(){
    this.reviewService.findAll(61).subscribe(reviews => {
      this.reviews = reviews;
      for (const review of this.reviews){
        if (review.userDto !== null){
          console.log('review-ul este : ' + review);
          review.userDto.photo = this.userService.getUserPhoto(review.userId);
        }
      }
    });
  }
}
