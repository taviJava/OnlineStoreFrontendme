import { Component, OnInit } from '@angular/core';
import {Review} from '../../model/review';
import {Product} from '../../model/product';
import {ReviewService} from '../../services/review.service';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../users/model/user';
import {AuthenticationService} from '../../../users/service/authentication.service';
import {UserService} from '../../../users/service/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.css']
})
export class ReviewAddComponent implements OnInit {
  review: Review = new Review();
  product: Product = new Product();
  reviews: Review[] = [];
  user: User = new User();
  id: number;
  photo: Observable<any>;
  currentUser: User;
  reviewsNumber = 0;
  numberList: number[] = [];
  numberListDif: number[] = [];
  onestar = 1;
  twostar = 2;
  threestar = 3;
  forstar = 4;
  fivestar = 5;
  listOne: number[] = [];
  listtwo: number[] = [];
  listthree: number[] = [];
  listfor: number[] = [];
  listfive: number[] = [];
  percentOne: number;
  percentTwo: number;
  percentThree: number;
  percentFor: number;
  percentFive: number;
  p = 1;            // pt paginare si urmatoarea la fel
  numberOfItemsPerP = 5;
  constructor(private reviewService: ReviewService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService,
              private  userService: UserService) {
    this.currentUser = new User();
  }

  ngOnInit(): void {
    this.numberList = [];
    this.numberListDif = [];
    this.id = this.route.snapshot.params.id;
    this.user = new User();
    this.reviews = [];
    this.reviews[0] = new Review();
    this.reviews[0].userDto = new User();
    this.getAll(this.id);
    this.review = new Review();
    this.product = new Product();
    this.productService.getById(this.id).subscribe(product => {
      this.product = new Product();
      this.product = product;
      this.addNumberAv(this.product);
      this.addNumberDif();
      this.reviewsNumber = this.product.reviewList.length;
      this.calculatePercent();
    });
    this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
  }
  // tslint:disable-next-line:typedef
  getAll(id: number){
    this.reviewService.findAll(id).subscribe(reviews => {
      this.reviews = reviews;
      for (let review of this.reviews){
        let a = 0;
        while (a !== review.rating){
          review.ratingList.push(a);
          a++;
        }
        if (review.userDto !== null){
          review.userDto.photo = this.userService.getUserPhoto(review.userId);
        }
      }
    });
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.review.email = this.currentUser.email;
    this.review.fullname = this.currentUser.fullName;
    this.reviewService.save(this.review, this.id).subscribe(data => {
      this.router.navigate(['viewProduct/' + this.id]);
    });
  }
  // tslint:disable-next-line:typedef
  setReview1Star(){
    this.emptyList();
    this.review.rating = 1;
    this.addNumber();
  }
  // tslint:disable-next-line:typedef
  setReview2Star(){
    this.emptyList();
    this.review.rating = 2;
    this.addNumber();
  }
  // tslint:disable-next-line:typedef
  setReview3Star(){
    this.emptyList();
    this.review.rating = 3;
    this.addNumber();
  }
  // tslint:disable-next-line:typedef
  setReview4Star(){
    this.emptyList();
    this.review.rating = 4;
    this.addNumber();
  }
  // tslint:disable-next-line:typedef
  setReview5Star(){
    this.emptyList();
    this.review.rating = 5;
    this.addNumber();
  }
  ifRatingSelected(): boolean{
    if (this.review.rating > 0){
      return true;
    }
    return false;
  }
  // tslint:disable-next-line:typedef
  addNumber(){
    let a = 0;
    while (a !== this.review.rating){
     this.numberList.push(a);
     a++;
   }
  }
  // tslint:disable-next-line:typedef
  addNumberAv(product: Product){
    let a = 0;
    while (a !== Math.round(product.reviewAverage)){
      this.numberList.push(a);
      a++;
    }
  }
  // tslint:disable-next-line:typedef
  addNumberDif(){
    let a = 0;
    while (a !== (5 - this.numberList.length)){
      this.numberListDif.push(a);
      a++;
    }
  }
  // tslint:disable-next-line:typedef
  emptyList(){
    this.numberList.length = 0;
  }
  // tslint:disable-next-line:typedef
  calculatePercent() {
    for (const rev of this.product.reviewList) {
      if (this.onestar === rev.rating) {
        this.listOne.push(rev.rating);
      } else if (this.twostar === rev.rating) {
        this.listtwo.push(rev.rating);
      } else if (this.threestar === rev.rating) {
        this.listthree.push(rev.rating);
      } else if (this.forstar === rev.rating) {
        this.listfor.push(rev.rating);
      } else if (this.fivestar === rev.rating) {
        this.listfive.push(rev.rating);
      }
    }
    this.percentOne = Math.round(((this.listOne.length * 100) / this.product.reviewList.length) * 10) / 10;
    this.percentTwo = Math.round(((this.listtwo.length * 100) / this.product.reviewList.length) * 10) / 10;
    this.percentThree = Math.round(((this.listthree.length * 100) / this.product.reviewList.length) * 10) / 10;
    this.percentFor = Math.round(((this.listfor.length * 100) / this.product.reviewList.length) * 10) / 10;
    this.percentFive = Math.round(((this.listfive.length * 100) / this.product.reviewList.length) * 10) / 10;
  }
  ifHavePhoto(user: User): boolean{
    if (user.idPhoto !== null){
      return true;
    }
    return false;
  }
}
