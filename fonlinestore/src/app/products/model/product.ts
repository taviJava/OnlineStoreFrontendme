import {Category} from '../../categories/model/category';
import {Manufacturer} from '../../manufacturers/model/manufacturer';
import {Observable} from 'rxjs';
import {Review} from './review';

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  idPhoto: string;
  orderline: any;
  productType: string;
  category: Category;
  manufacturer: Manufacturer;
  photo: Observable<any>;
  reviewList: Review[];
  reviewAverage: number;
}
