import {Product} from '../../products/model/product';

export class Orderline {
  id: number;
  product: Product;
  productsQuantity: number;
  productPrice: number;
}
