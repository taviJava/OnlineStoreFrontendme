import {Orderline} from './orderline';
import {Promo} from './promo';

export class Order {
  id: number;
  username: string;
  totalCost: number;
  deliveryAddress: string;
  userAddress: string;
  orderDate: string;
  status: string;
  promoCode: Promo;
  orderLines: Orderline[];
}
