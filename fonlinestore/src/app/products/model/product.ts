import {Category} from '../../categories/model/category';
import {Manufacturer} from '../../manufacturers/model/manufacturer';
import {Observable} from 'rxjs';

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  orderline: any;
  productType: string;
  category: Category;
  manufacturer: Manufacturer;
  photo: Observable<any>;
}
