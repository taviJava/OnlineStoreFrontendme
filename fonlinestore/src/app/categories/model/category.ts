import {Product} from '../../products/model/product';

export class Category {
  id: number;
  name: string;
  parent: Category;
  subcategories: Category[];
  products: Product[];
}
