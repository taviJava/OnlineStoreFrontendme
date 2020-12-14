import {Product} from './product';
import {Observable} from 'rxjs';
import {User} from '../../users/model/user';

export class Review {
 public id: number;
  public comment: string;
  public rating: number;
 public email: string;
 public fullname: string;
public date: string;
 public ratingList: number[];
 public userId: number;
 public userDto: User;
 public product: Product;
 public photo: Observable<any>;
}
