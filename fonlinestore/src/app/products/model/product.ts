import {Category} from '../../categories/model/category';
import {Manufacturer} from '../../manufacturers/model/manufacturer';

export class Product {
  id: number;
  name: string;
  photo: string;
  description: string;
  price: number;
  orderline: any;
  productType: string;
  subcategory: Category;
  manufacturer: Manufacturer;
}
